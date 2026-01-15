# Network Troubleshooting Guide

If your security group already allows SSH from `0.0.0.0/0` but GitHub Actions still can't connect, check these:

## 1. Verify Security Group Attachment

**In AWS Console:**
1. Go to **EC2** → **Instances**
2. Select your instance (IP: 35.75.14.169)
3. Click **Security** tab
4. Verify the security group with SSH rule `0.0.0.0/0` is listed
5. If multiple security groups, ensure at least one allows SSH from `0.0.0.0/0`

## 2. Check Network ACLs (Most Common Issue!)

Network ACLs can override security group rules!

**In AWS Console:**
1. Go to **VPC** → **Network ACLs**
2. Find the Network ACL for your instance's subnet:
   - Go to EC2 → Instances → Your instance → **Networking** tab
   - Note the **Subnet ID**
   - Go to VPC → Subnets → Find your subnet → Check **Network ACL**
3. Click on the Network ACL → **Inbound rules** tab
4. Ensure there's a rule allowing:
   - **Rule #:** (any number, lower = higher priority)
   - **Type:** Custom TCP Rule
   - **Protocol:** TCP (6)
   - **Port Range:** 22
   - **Source:** 0.0.0.0/0
   - **Allow/Deny:** Allow
5. If missing, click **Edit inbound rules** → **Add rule** → Save

**Important:** Network ACLs are stateless - you may also need an outbound rule:
- **Type:** Custom TCP Rule
- **Protocol:** TCP (6)
- **Port Range:** 32768-65535 (ephemeral ports)
- **Destination:** 0.0.0.0/0
- **Allow/Deny:** Allow

## 3. Verify Instance Configuration

**Check via AWS Console:**
- Instance state: **running**
- Public IP: Should show `35.75.14.169`
- Auto-assign Public IP: Enabled (if stopped/started)

**Check via SSH (if you can connect locally):**
```bash
# Check UFW (should already be configured)
sudo ufw status

# Check if SSH service is running
sudo systemctl status ssh

# Check network interfaces
ip addr show
```

## 4. Test Connection from Different Location

Try connecting from a different network to isolate the issue:
- If local SSH works but GitHub Actions doesn't → Network ACL issue
- If both fail → Security group or instance issue

## Quick Fix Commands

**If you have AWS CLI configured:**

```bash
# Get instance details
INSTANCE_ID=$(aws ec2 describe-instances \
  --filters "Name=ip-address,Values=35.75.14.169" \
  --query 'Reservations[0].Instances[0].InstanceId' \
  --output text)

# Get subnet ID
SUBNET_ID=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].SubnetId' \
  --output text)

# Get Network ACL ID
NACL_ID=$(aws ec2 describe-network-acls \
  --filters "Name=association.subnet-id,Values=$SUBNET_ID" \
  --query 'NetworkAcls[0].NetworkAclId' \
  --output text)

echo "Network ACL ID: $NACL_ID"
echo "Check inbound rules for this NACL in AWS Console"
```

## Still Not Working?

1. **Check CloudWatch Logs** for any network-related errors
2. **Review VPC Flow Logs** (if enabled) to see if traffic is being blocked
3. **Try creating a new security group** with only SSH rule and attach it
4. **Verify route tables** allow traffic to internet gateway
