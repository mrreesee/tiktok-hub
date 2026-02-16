# Deploy to AWS (Amazon Linux 2) — Docker approach

Prerequisites on the EC2 instance (Amazon Linux 2): an SSH user with sudo.

1) Install Docker and start the service

```bash
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -a -G docker $USER
# logout/login or `newgrp docker` to apply group change
```

2) Build and run the Docker image (from project root on the instance)

```bash
docker build -t tiktok-hub:latest .
docker run -d --name tiktok-hub -p 80:80 --restart unless-stopped tiktok-hub:latest
```

3) Optional: push image to ECR and use ECS or run with a systemd unit that restarts on reboot.

Systemd wrapper example (create `/etc/systemd/system/tiktok-hub.service`):

```ini
[Unit]
Description=TikTok Hub Docker container
After=docker.service

[Service]
Restart=always
ExecStart=/usr/bin/docker run --rm --name tiktok-hub -p 80:80 tiktok-hub:latest
ExecStop=/usr/bin/docker stop -t 2 tiktok-hub

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now tiktok-hub
```

Notes:
- This repo's frontend lives in the `src/` folder; the `Dockerfile` builds `src` using `npm run build`.
- If you prefer not to use Docker, install Node.js (>=18), run `npm ci` in `src/`, then `npm run build` and serve the `dist/` content using `nginx` or `serve`.
