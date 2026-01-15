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

### SSH Connection Fails
- Verify `EC2_SSH_KEY` secret contains the complete private key
- Check that `EC2_HOST` and `EC2_USER` are correct
- Ensure EC2 security group allows SSH (port 22) from GitHub Actions IPs

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
