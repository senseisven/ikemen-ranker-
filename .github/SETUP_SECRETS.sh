#!/bin/bash

# Quick script to help set up GitHub Secrets
# This script will help you copy your SSH key to add as a GitHub Secret

echo "🔐 GitHub Secrets Setup Helper"
echo "=============================="
echo ""

PEM_KEY_PATH="$HOME/Downloads/ikemen-key.pem"

if [ ! -f "$PEM_KEY_PATH" ]; then
    echo "❌ SSH key not found at: $PEM_KEY_PATH"
    echo "Please update PEM_KEY_PATH in this script or provide the path to your .pem file"
    exit 1
fi

echo "✅ Found SSH key at: $PEM_KEY_PATH"
echo ""
echo "📋 Instructions:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to: Settings → Secrets and variables → Actions"
echo "3. Click 'New repository secret'"
echo ""
echo "Add these 3 secrets:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Secret 1: EC2_SSH_KEY"
echo "────────────────────────────────────────────────────────────────────────────"
echo "Copy the entire contents of your SSH key (including BEGIN/END lines):"
echo ""
cat "$PEM_KEY_PATH"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Secret 2: EC2_HOST"
echo "Value: 35.75.14.169"
echo ""
echo "Secret 3: EC2_USER"
echo "Value: ubuntu"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Tip: On macOS, you can copy the key content with:"
echo "   cat $PEM_KEY_PATH | pbcopy"
echo ""
echo "After adding all secrets, push to main/master branch to trigger deployment!"
