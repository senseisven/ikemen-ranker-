#!/bin/bash

# Network diagnostic script for EC2 instance
# This helps identify why GitHub Actions can't connect

set -e

INSTANCE_IP="35.75.14.169"

echo "🔍 EC2 Network Diagnostic Script"
echo "================================="
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

echo "✅ AWS CLI configured"
echo ""

# Get instance details
echo "📋 Getting instance information..."
INSTANCE_ID=$(aws ec2 describe-instances \
    --filters "Name=ip-address,Values=${INSTANCE_IP}" \
    --query 'Reservations[0].Instances[0].InstanceId' \
    --output text 2>/dev/null)

if [ -z "$INSTANCE_ID" ] || [ "$INSTANCE_ID" == "None" ]; then
    echo "❌ Could not find EC2 instance with IP: ${INSTANCE_IP}"
    exit 1
fi

echo "✅ Instance ID: ${INSTANCE_ID}"
echo ""

# Get security groups
echo "🔐 Checking Security Groups..."
SECURITY_GROUPS=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].SecurityGroups[*].GroupId' \
    --output text)

echo "Security Groups attached:"
for SG_ID in $SECURITY_GROUPS; do
    echo "  - ${SG_ID}"
    
    # Check SSH rules in this security group
    SSH_RULES=$(aws ec2 describe-security-groups \
        --group-ids "$SG_ID" \
        --query "SecurityGroups[0].IpPermissions[?FromPort==\`22\` && IpProtocol==\`tcp\`]" \
        --output json)
    
    if echo "$SSH_RULES" | grep -q "0.0.0.0/0"; then
        echo "    ✅ Has SSH rule allowing 0.0.0.0/0"
    else
        echo "    ⚠️  No SSH rule allowing 0.0.0.0/0 found"
        echo "    Current SSH rules:"
        echo "$SSH_RULES" | jq -r '.[] | "      Port: \(.FromPort), Source: \(.IpRanges[0].CidrIp // "N/A")"' 2>/dev/null || echo "      (Could not parse)"
    fi
done

echo ""

# Get subnet and VPC info
echo "🌐 Checking Network Configuration..."
SUBNET_ID=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].SubnetId' \
    --output text)

VPC_ID=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].VpcId' \
    --output text)

echo "✅ Subnet ID: ${SUBNET_ID}"
echo "✅ VPC ID: ${VPC_ID}"
echo ""

# Get Network ACL
echo "🚦 Checking Network ACLs..."
NACL_ID=$(aws ec2 describe-network-acls \
    --filters "Name=association.subnet-id,Values=${SUBNET_ID}" \
    --query 'NetworkAcls[0].NetworkAclId' \
    --output text)

if [ -z "$NACL_ID" ] || [ "$NACL_ID" == "None" ]; then
    echo "⚠️  Could not find Network ACL for subnet"
    echo "   This might mean default NACL is being used"
else
    echo "✅ Network ACL ID: ${NACL_ID}"
    echo ""
    
    # Check inbound rules
    echo "📥 Checking Inbound Rules..."
    INBOUND_RULES=$(aws ec2 describe-network-acls \
        --network-acl-ids "$NACL_ID" \
        --query 'NetworkAcls[0].Entries[?Egress==\`false\`]' \
        --output json)
    
    SSH_ALLOWED=$(echo "$INBOUND_RULES" | jq -r '.[] | select(.PortRange.From == 22 or (.PortRange == null and .RuleNumber == 100)) | select(.CidrBlock == "0.0.0.0/0") | .RuleNumber' 2>/dev/null || echo "")
    
    if [ -n "$SSH_ALLOWED" ]; then
        echo "  ✅ Found rule allowing SSH (port 22) from 0.0.0.0/0 (Rule #${SSH_ALLOWED})"
    else
        echo "  ❌ NO RULE ALLOWING SSH (port 22) from 0.0.0.0/0"
        echo ""
        echo "  Current inbound rules:"
        echo "$INBOUND_RULES" | jq -r '.[] | "    Rule #\(.RuleNumber): \(.Protocol // "all") port \(.PortRange.From // "all")-\(.PortRange.To // "all") from \(.CidrBlock) - \(.RuleAction)"' 2>/dev/null || echo "    (Could not parse - check AWS Console)"
        echo ""
        echo "  🔧 FIX NEEDED: Add inbound rule:"
        echo "     Rule #: 100 (or any number lower than deny rules)"
        echo "     Type: Custom TCP"
        echo "     Port: 22"
        echo "     Source: 0.0.0.0/0"
        echo "     Action: Allow"
    fi
    
    # Check outbound rules
    echo ""
    echo "📤 Checking Outbound Rules..."
    OUTBOUND_RULES=$(aws ec2 describe-network-acls \
        --network-acl-ids "$NACL_ID" \
        --query 'NetworkAcls[0].Entries[?Egress==\`true\`]' \
        --output json)
    
    EPHEMERAL_ALLOWED=$(echo "$OUTBOUND_RULES" | jq -r '.[] | select(.PortRange.From >= 32768) | select(.CidrBlock == "0.0.0.0/0") | .RuleNumber' 2>/dev/null || echo "")
    
    if [ -n "$EPHEMERAL_ALLOWED" ]; then
        echo "  ✅ Found rule allowing ephemeral ports (for return traffic)"
    else
        echo "  ⚠️  May need outbound rule for ephemeral ports (32768-65535)"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Summary:"
echo "  Instance: ${INSTANCE_ID}"
echo "  IP: ${INSTANCE_IP}"
echo "  Subnet: ${SUBNET_ID}"
echo "  VPC: ${VPC_ID}"
if [ -n "$NACL_ID" ] && [ "$NACL_ID" != "None" ]; then
    echo "  Network ACL: ${NACL_ID}"
fi
echo ""
echo "🔗 To fix Network ACL issues:"
echo "  1. Go to: https://console.aws.amazon.com/vpc/home#NetworkAcls:"
echo "  2. Find Network ACL: ${NACL_ID}"
echo "  3. Edit inbound rules → Add rule for TCP port 22 from 0.0.0.0/0"
echo ""
