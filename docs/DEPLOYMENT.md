# Deployment Guide

This guide covers different deployment strategies for the Laboratory Automation Data Platform.

## Prerequisites

- Docker and Docker Compose
- PostgreSQL 13+
- Node.js 18+ (for local development)
- Redis (optional, for caching)

## Environment Setup

### 1. Database Setup

#### PostgreSQL Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Docker:**
```bash
docker run --name lab-postgres \
  -e POSTGRES_DB=laboratory_automation \
  -e POSTGRES_USER=labuser \
  -e POSTGRES_PASSWORD=labpass \
  -p 5432:5432 \
  -v lab_postgres_data:/var/lib/postgresql/data \
  -d postgres:13
```

### 2. Redis Setup (Optional)

```bash
# Ubuntu/Debian
sudo apt install redis-server

# macOS
brew install redis

# Docker
docker run --name lab-redis -p 6379:6379 -d redis:alpine
```

## Deployment Methods

### 1. Docker Compose (Recommended)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Database
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: laboratory_automation
      POSTGRES_USER: labuser
      POSTGRES_PASSWORD: labpass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U labuser -d laboratory_automation"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Redis Cache
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Backend API
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://labuser:labpass@postgres:5432/laboratory_automation
      JWT_SECRET: your-production-jwt-secret
      REDIS_URL: redis://redis:6379
      NODE_ENV: production
      PORT: 3001
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - upload_data:/app/uploads
      - log_data:/app/logs

  # Frontend
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      VITE_API_URL: http://localhost:3001/api

volumes:
  postgres_data:
  redis_data:
  upload_data:
  log_data:
```

Create backend `Dockerfile`:

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Create uploads directory
RUN mkdir -p uploads logs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start application
CMD ["npm", "start"]
```

Create frontend `Dockerfile`:

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

Frontend `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Enable gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # API proxy
        location /api {
            proxy_pass http://backend:3001;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # WebSocket support
        location /socket.io/ {
            proxy_pass http://backend:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

**Deploy with Docker Compose:**

```bash
# Production deployment
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Run database migrations
docker-compose exec backend npx prisma migrate deploy
```

### 2. Cloud Deployment

#### AWS ECS Deployment

1. **Build and push images to ECR:**

```bash
# Create ECR repositories
aws ecr create-repository --repository-name lab-automation-backend
aws ecr create-repository --repository-name lab-automation-frontend

# Get login token
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-west-2.amazonaws.com

# Build and push backend
cd backend
docker build -t lab-automation-backend .
docker tag lab-automation-backend:latest <account-id>.dkr.ecr.us-west-2.amazonaws.com/lab-automation-backend:latest
docker push <account-id>.dkr.ecr.us-west-2.amazonaws.com/lab-automation-backend:latest

# Build and push frontend
cd ../frontend
docker build -t lab-automation-frontend .
docker tag lab-automation-frontend:latest <account-id>.dkr.ecr.us-west-2.amazonaws.com/lab-automation-frontend:latest
docker push <account-id>.dkr.ecr.us-west-2.amazonaws.com/lab-automation-frontend:latest
```

2. **Create ECS Task Definition:**

```json
{
  "family": "lab-automation-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::<account>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.us-west-2.amazonaws.com/lab-automation-backend:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DATABASE_URL",
          "value": "postgresql://user:pass@rds-endpoint:5432/laboratory_automation"
        },
        {
          "name": "JWT_SECRET",
          "value": "production-jwt-secret"
        },
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/lab-automation-backend",
          "awslogs-region": "us-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Google Cloud Run Deployment

```bash
# Build and deploy backend
cd backend
gcloud builds submit --tag gcr.io/PROJECT-ID/lab-automation-backend
gcloud run deploy lab-automation-backend \
  --image gcr.io/PROJECT-ID/lab-automation-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL=postgresql://user:pass@host:5432/db

# Build and deploy frontend
cd ../frontend
gcloud builds submit --tag gcr.io/PROJECT-ID/lab-automation-frontend
gcloud run deploy lab-automation-frontend \
  --image gcr.io/PROJECT-ID/lab-automation-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 3. Traditional Server Deployment

#### Prerequisites

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx
```

#### Backend Deployment

```bash
# Clone and setup backend
git clone <repository-url>
cd laboratory-automation-platform/backend
npm install
cp .env.example .env
# Edit .env with production values

# Build application
npm run build

# Run database migrations
npx prisma migrate deploy
npx prisma generate

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'lab-automation-backend',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

#### Frontend Deployment

```bash
# Build frontend
cd ../frontend
npm install
npm run build

# Copy build files to nginx
sudo cp -r dist/* /var/www/html/

# Configure nginx
sudo nano /etc/nginx/sites-available/lab-automation
```

Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/lab-automation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## SSL/TLS Configuration

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

## Monitoring and Logging

### Application Monitoring

1. **Backend Logging:**
   - Winston logs to files and console
   - Structured JSON logging in production
   - Log rotation with logrotate

2. **Health Checks:**
   - `/health` endpoint for application health
   - Database connectivity checks
   - Redis connectivity checks

3. **Performance Monitoring:**
   - PM2 monitoring for Node.js
   - Docker health checks
   - External monitoring services (New Relic, DataDog)

### Database Monitoring

```bash
# PostgreSQL monitoring
sudo apt install postgresql-contrib
# Enable pg_stat_statements for query monitoring
```

## Backup Strategy

### Database Backups

```bash
# Automated PostgreSQL backup
#!/bin/bash
BACKUP_DIR="/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="laboratory_automation"

pg_dump -h localhost -U labuser -d $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

### File System Backups

```bash
# Backup uploaded files
rsync -av /app/uploads/ /backups/uploads/

# Backup logs
rsync -av /app/logs/ /backups/logs/
```

## Scaling Considerations

### Horizontal Scaling

1. **Load Balancer Setup:**
   - Use nginx or AWS ALB
   - Session affinity for WebSocket connections
   - Health check configuration

2. **Database Scaling:**
   - Read replicas for PostgreSQL
   - Connection pooling with PgBouncer
   - Database partitioning for large datasets

3. **Cache Scaling:**
   - Redis Cluster setup
   - Cache invalidation strategies
   - Session store clustering

### Performance Optimization

1. **Backend Optimization:**
   - Enable compression middleware
   - Implement response caching
   - Database query optimization
   - Connection pooling

2. **Frontend Optimization:**
   - Enable gzip compression
   - Configure browser caching
   - CDN for static assets
   - Image optimization

## Security Considerations

1. **Environment Variables:**
   - Never commit secrets to version control
   - Use secure secret management (AWS Secrets Manager, etc.)
   - Rotate secrets regularly

2. **Network Security:**
   - Configure firewalls
   - Use private networks for internal communication
   - Enable VPC in cloud deployments

3. **Application Security:**
   - Regular security updates
   - Input validation and sanitization
   - Rate limiting
   - CORS configuration

## Troubleshooting

### Common Issues

1. **Database Connection Issues:**
   ```bash
   # Check PostgreSQL status
   sudo systemctl status postgresql
   
   # Check connections
   sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"
   ```

2. **Memory Issues:**
   ```bash
   # Monitor memory usage
   free -h
   top
   
   # PM2 memory monitoring
   pm2 monit
   ```

3. **Disk Space:**
   ```bash
   # Check disk usage
   df -h
   
   # Check log file sizes
   du -sh /var/log/*
   ```

## Maintenance

### Regular Maintenance Tasks

1. **Weekly:**
   - Review application logs
   - Check disk space usage
   - Monitor database performance
   - Update dependencies (security patches)

2. **Monthly:**
   - Database maintenance (VACUUM, ANALYZE)
   - Log rotation and cleanup
   - Performance review
   - Backup verification

3. **Quarterly:**
   - Security audit
   - Performance optimization
   - Dependency updates
   - Documentation updates

---

For additional support or questions about deployment, please refer to the main documentation or create an issue in the repository.