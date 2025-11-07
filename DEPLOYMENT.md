# EAR Lab Website - Production Deployment Guide

## Overview
This guide covers deploying the EAR Lab website to production using various hosting options.

## Environment Setup

### 1. Environment Variables
Copy `.env.example` to `.env.local` and update with your production values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_APP_URL` - Your production domain URL
- `DATABASE_URL` - SQLite database path
- `NEXTAUTH_SECRET` - Authentication secret
- `SMTP_*` - Email configuration

### 2. Database Setup
For production, consider using PostgreSQL instead of SQLite:

```bash
# Install PostgreSQL CLI
npm install -g pg

# Create production database
createdb earlab_prod

# Update DATABASE_URL in .env.local
DATABASE_URL=postgresql://username:password@localhost:5432/earlab_prod
```

## Deployment Options

### Option 1: Vercel (Recommended)

#### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

#### Deployment Steps
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# Settings → Environment Variables
```

#### Post-Deployment
1. Configure custom domain in Vercel dashboard
2. Set up SSL (automatic with Vercel)
3. Configure analytics
4. Test all functionality

### Option 2: Docker + Nginx (VPS)

#### Prerequisites
- Ubuntu 20.04+ or CentOS 8+ server
- Docker and Docker Compose installed
- Nginx web server
- SSL certificate (Let's Encrypt recommended)

#### Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Create app directory
sudo mkdir -p /opt/earlab
sudo chown $USER:$USER /opt/earlab
```

#### Deployment Steps
```bash
# Clone repository
git clone https://github.com/your-username/earlab-website.git /opt/earlab
cd /opt/earlab

# Setup environment
cp .env.example .env.local
# Edit .env.local with production values

# Build and deploy
docker-compose -f docker-compose.prod.yml up -d
```

#### Nginx Configuration
Create `/etc/nginx/sites-available/earlab`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    root /opt/earlab/public;
    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ /index.html =404;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### SSL Certificate with Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com
```

### Option 3: AWS EC2 + Application Load Balancer

#### Prerequisites
- AWS account with appropriate permissions
- AWS CLI installed
- Route 53 hosted domain (recommended)

#### Deployment Steps
```bash
# Create EC2 instance
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t3.medium \
  --key-name earlab-key \
  --security-group-ids sg-903004f8example \
  --subnet-id subnet-12345 \
  --associate-public-ip-address \
  --user-data file://setup-script.sh

# Create security group
aws ec2 create-security-group \
  --group-name earlab-sg \
  --description "Security group for EAR Lab" \
  --protocol tcp \
  --port 22 \
  --port 80 \
  --port 443

# Create Application Load Balancer
aws elbv2 create-load-balancer \
  --name earlab-alb \
  --subnets subnet-12345 subnet-67890 \
  --security-groups sg-903004f8example \
  --scheme internet-facing \
  --type application \
  --ip-address-type ipv4

# Create target group
aws elbv2 create-target-group \
  --name earlab-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-12345 \
  --health-check-path /api/health \
  --health-check-interval-seconds 30 \
  --health-check-timeout-seconds 5 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 2
```

### Option 4: DigitalOcean App Platform

#### Prerequisites
- DigitalOcean account
- GitHub repository connected

#### Deployment Steps
```bash
# Install doctl
curl -sSL https://github.com/digitalocean/doctl/releases/latest/download/doctl-linux-amd64.tar.gz | tar xz
sudo mv doctl /usr/local/bin
sudo chmod +x /usr/local/bin/doctl

# Create app
doctl apps create earlab \
  --region nyc3 \
  --buildpack-heroku \
  --env-var NODE_ENV=production \
  --env-var NEXT_PUBLIC_APP_URL=https://earlab.ondigitalocean.app
```

## Monitoring and Maintenance

### 1. Application Monitoring
```bash
# Setup PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start ecosystem.config.js

# Monitor logs
pm2 logs earlab-app
pm2 monit
```

### 2. Database Backups
```bash
# SQLite backup script
#!/bin/bash
BACKUP_DIR="/opt/backups/earlab"
DATE=$(date +%Y%m%d_%H%M%S)
DB_PATH="/opt/earlab/data/earlab.db"

mkdir -p $BACKUP_DIR
sqlite3 $DB_PATH ".backup $BACKUP_DIR/earlab_$DATE.db"

# Keep only last 30 days
find $BACKUP_DIR -name "*.db" -mtime +30 -delete

# Add to crontab
0 2 * * * /opt/earlab/scripts/backup.sh
```

### 3. Log Management
```bash
# Log rotation with logrotate
sudo apt install logrotate

# Create /etc/logrotate.d/earlab
/opt/earlab/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        systemctl reload nginx
}
```

## Security Hardening

### 1. Server Security
```bash
# Configure firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 5432/tcp  # PostgreSQL if not needed externally
sudo ufw enable

# Disable root SSH login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Install fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 2. Application Security
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]

module.exports = {
  async headers() {
    return [
      ...securityHeaders,
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Rate-Limit-Limit',
            value: '100'
          },
          {
            key: 'X-Rate-Limit-Remaining',
            value: '99'
          }
        ]
      }
    ]
  }
}
```

## Performance Optimization

### 1. Caching Strategy
```javascript
// Implement Redis caching
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

// Cache API responses
const cacheMiddleware = async (req, res, next) => {
  const key = `cache:${req.url}:${JSON.stringify(req.query)}`
  const cached = await redis.get(key)
  
  if (cached) {
    return res.json(JSON.parse(cached))
  }
  
  const result = await next()
  await redis.setex(key, 300, JSON.stringify(result)) // 5 minutes cache
  return result
}
```

### 2. Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);

-- Analyze slow queries
EXPLAIN QUERY PLAN SELECT * FROM blog_posts WHERE published_at > '2024-01-01' ORDER BY published_at DESC LIMIT 10;
```

## Scaling Considerations

### 1. Horizontal Scaling
- Use load balancers for multiple app instances
- Implement read replicas for database
- Use CDN for static assets
- Consider serverless functions for API endpoints

### 2. Database Scaling
- Implement connection pooling
- Use read replicas for read-heavy operations
- Consider sharding for large datasets
- Implement proper indexing strategy

## Troubleshooting

### Common Issues
1. **Memory Issues**: Monitor memory usage, implement proper garbage collection
2. **Database Connections**: Use connection pooling, handle connection limits
3. **SSL Certificate Issues**: Monitor expiration, set up auto-renewal
4. **Performance**: Use monitoring tools, profile slow queries

### Health Checks
```bash
# Application health endpoint
curl -f http://localhost:3000/api/health

# Database connectivity
sqlite3 /opt/earlab/data/earlab.db "SELECT 1"

# Service status
systemctl status nginx
systemctl status earlab-app
pm2 status earlab-app
```

## Rollback Strategy

### 1. Database Backups
- Regular automated backups
- Point-in-time recovery capability
- Test restore procedures

### 2. Application Rollback
```bash
# Blue-green deployment
docker-compose -f docker-compose.blue.yml up -d
# Test new version
# Switch traffic if successful
docker-compose -f docker-compose.green.yml down
```

### 3. Monitoring Alerts
- Set up alerting for critical metrics
- Implement proper notification channels
- Document escalation procedures

This deployment guide provides multiple options for deploying the EAR Lab website to production, with detailed steps for each approach and comprehensive operational guidance.