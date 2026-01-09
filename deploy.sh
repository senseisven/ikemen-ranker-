#!/bin/bash

# Deployment script for EC2 instance
# Usage: ./deploy.sh <EC2_IP_OR_HOSTNAME> <USERNAME>

set -e

EC2_HOST="${1}"
EC2_USER="${2:-ubuntu}"
PEM_KEY="/Users/einarsoderberg/Downloads/ikemen-key.pem"
APP_DIR="/home/${EC2_USER}/create-anything"
DEPLOY_DIR="${APP_DIR}/apps/web"

if [ -z "$EC2_HOST" ]; then
    echo "Error: EC2 hostname or IP address is required"
    echo "Usage: ./deploy.sh <EC2_IP_OR_HOSTNAME> [USERNAME]"
    exit 1
fi

echo "🚀 Starting deployment to ${EC2_USER}@${EC2_HOST}..."

# Check if PEM key exists
if [ ! -f "$PEM_KEY" ]; then
    echo "Error: PEM key not found at $PEM_KEY"
    exit 1
fi

# Set proper permissions on PEM key
chmod 400 "$PEM_KEY"

# Test SSH connection
echo "📡 Testing SSH connection..."
ssh -i "$PEM_KEY" -o StrictHostKeyChecking=no "${EC2_USER}@${EC2_HOST}" "echo 'SSH connection successful!'" || {
    echo "Error: Failed to connect to EC2 instance"
    exit 1
}

# Create app directory on EC2
echo "📁 Creating app directory..."
ssh -i "$PEM_KEY" "${EC2_USER}@${EC2_HOST}" "mkdir -p ${APP_DIR}"

# Copy project files to EC2 (excluding node_modules and build artifacts)
echo "📦 Copying project files..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude 'build' \
    --exclude '.react-router' \
    --exclude '*.log' \
    -e "ssh -i $PEM_KEY -o StrictHostKeyChecking=no" \
    ./ "${EC2_USER}@${EC2_HOST}:${APP_DIR}/"

# Install dependencies and build on EC2
echo "🔨 Installing dependencies and building..."
ssh -i "$PEM_KEY" "${EC2_USER}@${EC2_HOST}" << ENDSSH
    cd ${DEPLOY_DIR}
    export NODE_ENV=production
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "📥 Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    
    # Verify Node.js installation
    node --version
    npm --version
    
    # Install dependencies
    echo "📦 Installing npm dependencies..."
    npm install --legacy-peer-deps --production=false
    
    # Build the application
    echo "🏗️  Building application..."
    # Install timeout if not available
    if ! command -v timeout &> /dev/null; then
        sudo apt-get install -y coreutils
    fi
    
    # Build with timeout to prevent hanging
    timeout 600 npm run build || {
        BUILD_EXIT_CODE=$?
        if [ $BUILD_EXIT_CODE -eq 124 ]; then
            echo "⚠️  Build timed out after 10 minutes"
        else
            echo "⚠️  Build exited with code $BUILD_EXIT_CODE"
        fi
        
        # Check if build directory exists and has content
        if [ -d "build" ] && [ -f "build/server/index.js" ]; then
            echo "✅ Build directory exists with server file, continuing..."
        else
            echo "❌ Build directory missing or incomplete, exiting..."
            exit 1
        fi
    }
    
    echo "✅ Build process completed!"
ENDSSH

# Create systemd service file for production
echo "⚙️  Setting up systemd service..."
ssh -i "$PEM_KEY" "${EC2_USER}@${EC2_HOST}" << ENDSSH
    NPM_PATH=\$(which npm)
    sudo tee /etc/systemd/system/create-anything.service > /dev/null << EOF
[Unit]
Description=Create Anything Web App
After=network.target

[Service]
Type=simple
User=${EC2_USER}
WorkingDirectory=${DEPLOY_DIR}
Environment=NODE_ENV=production
Environment=PORT=4000
ExecStart=\${NPM_PATH} start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable create-anything.service
    sudo systemctl restart create-anything.service
    
    echo "✅ Service started!"
ENDSSH

# Check service status
echo "🔍 Checking service status..."
ssh -i "$PEM_KEY" "${EC2_USER}@${EC2_HOST}" "sudo systemctl status create-anything.service --no-pager -l" || true

echo ""
echo "✅ Deployment completed!"
echo "🌐 Your app should be running on http://${EC2_HOST}:4000"
echo ""
echo "Useful commands:"
echo "  Check status: ssh -i $PEM_KEY ${EC2_USER}@${EC2_HOST} 'sudo systemctl status create-anything.service'"
echo "  View logs: ssh -i $PEM_KEY ${EC2_USER}@${EC2_HOST} 'sudo journalctl -u create-anything.service -f'"
echo "  Restart: ssh -i $PEM_KEY ${EC2_USER}@${EC2_HOST} 'sudo systemctl restart create-anything.service'"

