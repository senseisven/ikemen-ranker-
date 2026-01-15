#!/bin/bash

# Script to fix EC2 Security Group to allow SSH from GitHub Actions
# This adds an inbound rule allowing SSH (port 22) from anywhere

set -e

INSTANCE_IP="35.75.14.169"

echo "🔧 EC2 Security Group Fix Script"
echo "=================================="
echo ""
echo "This script will add an SSH rule to your EC2 security group"
echo "to allow connections from GitHub Actions."
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
    echo "Please check the IP address and try again"
    exit 1
fi

echo "✅ Found instance: ${INSTANCE_ID}"

# Get security group ID
SG_ID=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query 'Reservations[0].Instances[0].SecurityGroups[0].GroupId' \
    --output text)

echo "✅ Found security group: ${SG_ID}"
echo ""

# Check if rule already exists
echo "🔍 Checking existing rules..."
EXISTING_RULE=$(aws ec2 describe-security-groups \
    --group-ids "$SG_ID" \
    --query "SecurityGroups[0].IpPermissions[?FromPort==\`22\` && IpProtocol==\`tcp\`]" \
    --output json)

if echo "$EXISTING_RULE" | grep -q "0.0.0.0/0"; then
    echo "⚠️  Security group already allows SSH from anywhere (0.0.0.0/0)"
    echo "If you're still having connection issues, check:"
    echo "  1. The security group is attached to your instance"
    echo "  2. Your EC2 instance is running"
    echo "  3. Network ACLs aren't blocking the connection"
    exit 0
fi

# Add SSH rule
echo "➕ Adding SSH rule (port 22) allowing connections from anywhere..."
echo "   This allows GitHub Actions (and anyone else) to SSH to your instance."
echo ""

read -p "Continue? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

aws ec2 authorize-security-group-ingress \
    --group-id "$SG_ID" \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0 \
    --description "Allow SSH from GitHub Actions" 2>&1 | grep -v "InvalidPermission.Duplicate" || {
    echo "✅ Rule added (or already exists)"
}

echo ""
echo "✅ Security group updated!"
echo ""
echo "📝 Next steps:"
echo "  1. Wait 10-30 seconds for changes to propagate"
echo "  2. Re-run your GitHub Actions workflow"
echo "  3. The SSH connection should now work"
echo ""
