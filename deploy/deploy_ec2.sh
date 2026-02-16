#!/usr/bin/env bash
set -euo pipefail

# Usage: run this from the project root on the EC2 instance
# Example: cd /home/ec2-user/app && sudo bash deploy/deploy_ec2.sh

echo "Updating system and installing Docker..."
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER || true

echo "Building Docker image..."
docker build -t tiktok-hub:latest .

echo "Stopping and removing existing container (if any)..."
if docker ps -a --format '{{.Names}}' | grep -q '^tiktok-hub$'; then
  docker stop tiktok-hub || true
  docker rm tiktok-hub || true
fi

echo "Running container..."
docker run -d --name tiktok-hub -p 80:80 --restart unless-stopped tiktok-hub:latest

echo "Installing systemd service to ensure auto-start on reboot..."
if [ -f deploy/tiktok-hub.service ]; then
  sudo cp deploy/tiktok-hub.service /etc/systemd/system/tiktok-hub.service
  sudo systemctl daemon-reload
  sudo systemctl enable --now tiktok-hub
fi

echo "Deploy finished. Check container logs with: docker logs -f tiktok-hub"
