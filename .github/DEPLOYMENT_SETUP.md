# GitHub Actions Deployment Setup

This document explains how to set up automatic deployment to AWS EC2 using GitHub Actions.

## Prerequisites

- GitHub repository with this code
- AWS EC2 instance running Ubuntu
- SSH access to the EC2 instance

## Setup Instructions

### 1. Get Your SSH Private Key

You need to add your EC2 SSH private key (`ikemen-key.pem`) as a GitHub Secret.

**Option A: Copy the key content**
```bash
cat ~/Downloads/ikemen-key.pem | pbcopy  # macOS
# or
cat ~/Downloads/ikemen-key.pem | xclip -selection clipboard  # Linux
```

**Option B: Read the file and copy its entire contents**

### 2. Configure GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets:

#### Required Secrets:

1. **`EC2_SSH_KEY`**
   - Value: The entire contents of your `ikemen-key.pem` file
   - Include the `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines
   - Example:
     ```
     -----BEGIN RSA PRIVATE KEY-----
     MIIEpAIBAAKCAQEA...
     (entire key content)
     ...
     -----END RSA PRIVATE KEY-----
     ```

2. **`EC2_HOST`**
   - Value: `35.75.14.169` (your EC2 public IP or hostname)

3. **`EC2_USER`**
   - Value: `ubuntu` (your EC2 SSH username)

### 3. Verify Setup

1. Push a commit to the `main` or `master` branch
2. Go to **Actions** tab in your GitHub repository
3. You should see the workflow running
4. Check the logs to verify deployment success

## How It Works

The workflow:
1. Triggers automatically on push to `main`/`master` branch
2. Checks out your code
3. Sets up SSH connection to EC2
4. Copies project files (excluding node_modules, .git, etc.)
5. Installs dependencies and builds the app
6. Restarts the systemd service
7. Verifies the deployment

## Manual Deployment

You can also trigger the workflow manually:
1. Go to **Actions** tab
2. Select **Deploy to AWS EC2** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## Troubleshooting

### "Process completed with exit code 1" on Setup SSH step

This usually means one of your secrets is not set correctly. Check:

1. **Verify all secrets are set:**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Make sure you see all three secrets: `EC2_SSH_KEY`, `EC2_HOST`, `EC2_USER`
   - Check that none show as "hidden" or empty

2. **Check EC2_SSH_KEY format:**
   - The key must include the BEGIN and END lines
   - Copy the ENTIRE key including:
     ```
     -----BEGIN RSA PRIVATE KEY-----
     (all the key content)
     -----END RSA PRIVATE KEY-----
     ```
   - Make sure there are no extra spaces or characters before/after
   - Try copying the key again: `cat ~/Downloads/ikemen-key.pem | pbcopy`

3. **Verify secret values:**
   - `EC2_HOST` should be exactly: `35.75.14.169` (no spaces, no quotes)
   - `EC2_USER` should be exactly: `ubuntu` (lowercase, no spaces)

4. **Re-create secrets if needed:**
   - Delete the existing secrets
   - Create them again, being careful to copy the exact values
   - For the SSH key, make sure you copy the entire file content

5. **Check workflow logs:**
   - The "Validate secrets" step will show which secret is missing
   - Look for error messages like "EC2_SSH_KEY secret is not set or is empty"

### SSH Connection Timeout / Connection Refused

**Error:** `ssh: connect to host *** port 22: Connection timed out`

If you already have an SSH rule allowing `0.0.0.0/0` in your security group but still get timeouts, check:

1. **Verify Security Group is Attached:**
   - Go to EC2 → Instances → Select your instance
   - Check the **Security** tab
   - Ensure the security group with the `0.0.0.0/0` SSH rule is listed and attached
   - If multiple security groups, ensure at least one allows SSH from `0.0.0.0/0`

2. **Check Network ACLs (VPC):**
   - Go to **VPC** → **Network ACLs**
   - Find the Network ACL associated with your instance's subnet
   - Check **Inbound rules** - should allow TCP port 22 from `0.0.0.0/0`
   - Network ACLs can override security group rules!

3. **Verify UFW Firewall (on the instance):**
   ```bash
   ssh -i ~/Downloads/ikemen-key.pem ubuntu@35.75.14.169
   sudo ufw status
   ```
   - Should show: `22/tcp ALLOW Anywhere`
   - If not, run: `sudo ufw allow 22/tcp`

4. **Check Instance State:**
   - Ensure instance is **running** (not stopped/stopping)
   - Check if instance has a public IP address

**Solution: Update EC2 Security Group**

1. **Go to AWS Console:**
   - Navigate to **EC2** → **Instances**
   - Select your instance (`35.75.14.169`)
   - Click on the **Security** tab
   - Click on the security group name

2. **Edit Inbound Rules:**
   - Click **Edit inbound rules**
   - Click **Add rule**
   - Configure:
     - **Type:** SSH
     - **Protocol:** TCP
     - **Port range:** 22
     - **Source:** `0.0.0.0/0` (allows from anywhere)
       - ⚠️ **Note:** For better security, you can restrict to GitHub Actions IP ranges, but they change frequently
     - **Description:** "Allow SSH from GitHub Actions"
   - Click **Save rules**

3. **Alternative (More Secure but Complex):**
   - Use GitHub's IP ranges: https://api.github.com/meta
   - Or use AWS Systems Manager Session Manager (requires additional setup)

4. **Verify:**
   - Wait a minute for changes to propagate
   - Re-run the GitHub Actions workflow

**Quick Fix Command (if you have AWS CLI configured):**
```bash
# Get your instance ID
INSTANCE_ID=$(aws ec2 describe-instances --filters "Name=ip-address,Values=35.75.14.169" --query 'Reservations[0].Instances[0].InstanceId' --output text)

# Get security group ID
SG_ID=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].SecurityGroups[0].GroupId' --output text)

# Add SSH rule (allows from anywhere - less secure but works)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0
```

### SSH Connection Fails (Other Reasons)
- Verify `EC2_SSH_KEY` secret contains the complete private key
- Check that `EC2_HOST` and `EC2_USER` are correct
- The workflow now validates secrets before attempting SSH connection

### Build Fails
- Check the build logs in GitHub Actions
- Verify Node.js is installed on EC2 (workflow will install it if missing)
- Check that all dependencies are compatible

### Service Won't Start
- SSH into EC2 and check logs: `sudo journalctl -u create-anything.service -f`
- Verify the app builds successfully: `cd /home/ubuntu/create-anything/apps/web && npm run build`
- Check service status: `sudo systemctl status create-anything.service`

## Security Notes

- Never commit your SSH private key to the repository
- GitHub Secrets are encrypted and only accessible during workflow runs
- The SSH key is automatically cleaned up after each workflow run
- Consider using AWS Systems Manager Session Manager for enhanced security
