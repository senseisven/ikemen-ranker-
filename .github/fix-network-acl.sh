#!/bin/bash

# Script to automatically fix Network ACL to allow SSH from GitHub Actions

set -e

INSTANCE_IP="35.75.14.169"

echo "🔧 Network ACL Fix Script"
echo "========================="
echo ""
echo "This script will add Network ACL rules to allow SSH from GitHub Actions"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured"
    echo "Run: aws configure"
    exit 1
fi

echo "✅ AWS CLI found and configured"
echo ""

# Get instance ID
echo "🔍 Finding EC2 instance..."
INSTANCE_ID=$(aws ec2 describe-instances \
    --filters "Name=ip-address,Values=${INSTANCE_IP}" \
    --query 'Reservations[0].Instances[0].InstanceId' \
    --output text 2>/dev/null)

if [ -z "$INSTANCE_ID" ] || [ "$INSTANCE_ID" == "None" ]; then
    echo "❌ Could not find EC2 instance with IP: ${INSTANCE_IP}"
    exit 1
fi

echo "✅ Found instance: ${INSTANCE_ID}"

# Get subnet ID
SUBNET_ID=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].SubnetId' \
    --output text)

echo "✅ Found subnet: ${SUBNET_ID}"

# Get Network ACL ID
NACL_ID=$(aws ec2 describe-network-acls \
    --filters "Name=association.subnet-id,Values=${SUBNET_ID}" \
    --query 'NetworkAcls[0].NetworkAclId' \
    --output text)

if [ -z "$NACL_ID" ] || [ "$NACL_ID" == "None" ]; then
    echo "❌ Could not find Network ACL for subnet"
    exit 1
fi

echo "✅ Found Network ACL: ${NACL_ID}"
echo ""

# Check if SSH rule already exists
echo "🔍 Checking existing rules..."
EXISTING_SSH=$(aws ec2 describe-network-acls \
    --network-acl-ids "$NACL_ID" \
    --query "NetworkAcls[0].Entries[?Egress==\`false\` && PortRange.From==\`22\` && CidrBlock==\`0.0.0.0/0\`]" \
    --output json)

if echo "$EXISTING_SSH" | grep -q "RuleNumber"; then
    echo "⚠️  Network ACL already has SSH rule allowing 0.0.0.0/0"
    echo "If you're still having issues, check:"
    echo "  1. Rule number is lower than any deny rules"
    echo "  2. Rule action is 'allow'"
    echo "  3. Outbound rules allow return traffic"
    exit 0
fi

# Find the lowest available rule number
echo "📋 Finding available rule number..."
HIGHEST_RULE=$(aws ec2 describe-network-acls \
    --network-acl-ids "$NACL_ID" \
    --query 'NetworkAcls[0].Entries[?Egress==`false`].RuleNumber' \
    --output text | tr '\t' '\n' | sort -n | head -1)

if [ -z "$HIGHEST_RULE" ]; then
    RULE_NUMBER=100
else
    RULE_NUMBER=$((HIGHEST_RULE - 1))
    if [ $RULE_NUMBER -lt 1 ]; then
        RULE_NUMBER=100
    fi
fi

echo "✅ Will use rule number: ${RULE_NUMBER}"
echo ""

# Add inbound SSH rule
echo "➕ Adding inbound SSH rule..."
read -p "Continue? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

aws ec2 create-network-acl-entry \
    --network-acl-id "$NACL_ID" \
    --rule-number "$RULE_NUMBER" \
    --protocol tcp \
    --port-range From=22,To=22 \
    --cidr-block 0.0.0.0/0 \
    --egress false \
    --rule-action allow 2>&1 | grep -v "InvalidPermission.Duplicate" || {
    echo "✅ SSH rule added (or already exists)"
}

# Check outbound rules for ephemeral ports
echo ""
echo "🔍 Checking outbound rules..."
EPHEMERAL_RULE=$(aws ec2 describe-network-acls \
    --network-acl-ids "$NACL_ID" \
    --query "NetworkAcls[0].Entries[?Egress==\`true\` && PortRange.From==\`32768\` && PortRange.To==\`65535\` && CidrBlock==\`0.0.0.0/0\`]" \
    --output json)

if ! echo "$EPHEMERAL_RULE" | grep -q "RuleNumber"; then
    echo "➕ Adding outbound ephemeral ports rule..."
    OUTBOUND_RULE_NUM=$((RULE_NUMBER + 1))
    
    aws ec2 create-network-acl-entry \
        --network-acl-id "$NACL_ID" \
        --rule-number "$OUTBOUND_RULE_NUM" \
        --protocol tcp \
        --port-range From=32768,To=65535 \
        --cidr-block 0.0.0.0/0 \
        --egress true \
        --rule-action allow 2>&1 | grep -v "InvalidPermission.Duplicate" || {
        echo "✅ Ephemeral ports rule added (or already exists)"
    }
else
    echo "✅ Outbound ephemeral ports rule already exists"
fi

echo ""
echo "✅ Network ACL updated!"
echo ""
echo "📝 Next steps:"
echo "  1. Wait 10-30 seconds for changes to propagate"
echo "  2. Re-run your GitHub Actions workflow"
echo "  3. SSH connection should now work"
echo ""
