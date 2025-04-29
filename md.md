Okay, here are the recommended files with their contents and corresponding paths within your project structure.
Important Preliminaries:
 * Replace Placeholders: Carefully replace placeholders like YOUR_GITHUB_USERNAME, YOUR_REPOSITORY_NAME, yourdomain.com, /opt/your-app, your_db_user, your_db_password, your_db_name with your actual values.
 * Secrets:
   * GitHub Actions Secrets: You will need to configure secrets in your GitHub repository settings (Settings -> Secrets and variables -> Actions) for:
     * SSH_HOST: The IP address or domain name of your Ubuntu server.
     * SSH_USER: The username to log in to your server.
     * SSH_KEY: The private SSH key corresponding to a public key added to the server's ~/.ssh/authorized_keys for the SSH_USER.
     * GHCR_TOKEN: A GitHub Personal Access Token (classic or fine-grained) with write:packages permission to push to GitHub Container Registry.
   * Server Environment File: Create the .env.prod file only on the server and ensure it has strict permissions (chmod 600 .env.prod). DO NOT COMMIT THIS FILE TO GIT.
 * Database: This setup assumes you run PostgreSQL as a container managed by Docker Compose. Ensure the DATABASE_URL matches this setup.
 * pnpm: The Dockerfiles assume pnpm is used, based on your lockfiles.
 * Working Directory: Assumes your project will reside in /opt/your-app on the server. Adjust paths if necessary.
1. Backend Dockerfile
 * Path: apps/server/Dockerfile (You already have this file, replace its content)
 * Content:
# Stage 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy the rest of the application code
COPY . .

# Build TypeScript to JavaScript
# Ensure your tsconfig.json specifies the 'outDir' as './dist'
RUN pnpm run build

# Stage 2: Production stage
FROM node:20-alpine
WORKDIR /app

# Install pnpm (needed if you use pnpm start, otherwise can skip)
# RUN npm install -g pnpm

# Copy production dependencies node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules
# Copy built code from builder stage
COPY --from=builder /app/dist ./dist
# Copy package.json (needed for 'start' script if using 'pnpm start')
COPY package.json .

# Expose the port the app runs on (as defined by PORT env var, e.g., 4000)
# This is informational; the actual port mapping happens in docker-compose.yml
EXPOSE 4000

# Command to run the application
# Assumes your 'start' script in package.json is 'node dist/index.js'
CMD [ "node", "dist/index.js" ]
# Or if you use pnpm: CMD [ "pnpm", "start" ]

2. Frontend Dockerfile (Multi-stage with Nginx)
 * Path: apps/client/Dockerfile (You already have this file, replace its content)
 * Content:
# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy the rest of the application code
COPY . .

# Set build-time environment variables if necessary
# Example: ARG VITE_API_BASE_URL
# ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# If your API URL needs to be baked in at build time, uncomment and manage via build args.
# Otherwise, configure Nginx to proxy correctly (recommended).

# Build the React app
# Ensure your 'build' script outputs to './dist' (Vite default)
RUN pnpm run build

# Stage 2: Serve application with Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration
# We will create this nginx.conf file separately
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

3. Nginx Configuration for Frontend Container
 * Path: apps/client/nginx.conf (Create this new file)
 * Content:
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com; # Replace with your domain or localhost if testing
    root /usr/share/nginx/html;
    index index.html index.htm;

    # Serve static files directly
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to the backend service
    # Assumes your client makes requests to '/api/...'
    # Adjust the path '/api/' if your client uses a different base path for API calls
    location /api/ {
        # The 'backend' name must match the backend service name in docker-compose.prod.yml
        # 4000 is the port the backend container listens on internally
        proxy_pass http://backend:4000/; # Note the trailing slash!

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Optional: Increase proxy timeouts if needed
        # proxy_connect_timeout 60s;
        # proxy_send_timeout 60s;
        # proxy_read_timeout 60s;
    }

    # Optional: Add security headers, compression, caching rules etc. here
    # Example: gzip compression
    # gzip on;
    # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    # gzip_proxied any;
    # gzip_min_length 1000;
    # gzip_disable "msie6";

    # Error pages (optional)
    # error_page 500 502 503 504 /50x.html;
    # location = /50x.html {
    #     root /usr/share/nginx/html;
    # }
}

4. Production Docker Compose File
 * Path: docker-compose.prod.yml (Create or replace this at the project root, sibling to apps)
 * Content:
version: '3.8'

services:
  backend:
    build:
      context: ./apps/server
      dockerfile: Dockerfile
    image: ghcr.io/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME/backend:${TAG:-latest} # Set TAG env var in CI/CD or defaults to latest
    container_name: prod-backend
    restart: unless-stopped
    env_file:
      - .env.prod # Load environment variables from this file (MUST exist on server)
    networks:
      - app-network
    depends_on:
      db:
        condition: service_healthy # Wait for DB to be ready
    expose:
      # Port exposed internally within Docker network, not to host
      - "${PORT:-4000}" # Use PORT from .env.prod, default to 4000

  frontend:
    build:
      context: ./apps/client
      dockerfile: Dockerfile
      # Optional: Pass build args if needed for VITE_API_BASE_URL during build
      # args:
      #   VITE_API_BASE_URL: ${VITE_API_BASE_URL} # Needs VITE_API_BASE_URL set in the build env
    image: ghcr.io/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME/frontend:${TAG:-latest}
    container_name: prod-frontend-nginx
    restart: unless-stopped
    ports:
      - "80:80" # Map host port 80 to container port 80
      # - "443:443" # Uncomment if you configure SSL within this container
    networks:
      - app-network
    depends_on:
      - backend

  db:
    image: postgres:15-alpine # Use a specific Postgres version
    container_name: prod-postgres-db
    restart: unless-stopped
    volumes:
      - postgres_data:/var/lib/postgresql/data # Persist data
    environment:
      POSTGRES_DB: ${DB_NAME} # From .env.prod
      POSTGRES_USER: ${DB_USER} # From .env.prod
      POSTGRES_PASSWORD: ${DB_PASSWORD} # From .env.prod
    networks:
      - app-network
    ports:
      # Only expose externally if needed for direct access/debugging. Usually not recommended.
      # - "5432:5432"
      - "127.0.0.1:5432:5432" # Expose only to the host machine for tools like Drizzle Studio
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Optional: Add PocketBase service if you run it separately
  # pocketbase:
  #   image: ghcr.io/pocketbase/pocketbase:latest # Or specific version
  #   container_name: prod-pocketbase
  #   restart: unless-stopped
  #   volumes:
  #     - pocketbase_data:/pb_data
  #   ports:
  #     - "8090:8090" # Adjust port if needed
  #   networks:
  #     - app-network
  #   environment:
  #     # Set PocketBase specific env vars if needed
  #     # Example: PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD from .env.prod
  #     POCKETBASE_ADMIN_EMAIL: ${POCKETBASE_ADMIN_EMAIL}
  #     POCKETBASE_ADMIN_PASSWORD: ${POCKETBASE_ADMIN_PASSWORD}

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
  # pocketbase_data: # Uncomment if using PocketBase volume

5. Server Environment File Structure (Example)
 * Path: .env.prod (Create this file ONLY ON THE SERVER in /opt/your-app or your chosen project directory. DO NOT COMMIT TO GIT!)
 * Content:
# Backend Configuration
PORT=4000
# Use the Docker service name 'db' for the host here
DATABASE_URL=postgresql://your_db_user:your_db_password@db:5432/your_db_name
# POCKETBASE_URL=http://pocketbase:8090 # If running pocketbase container
POCKETBASE_URL=http://localhost:8090 # Or adjust if pocketbase runs elsewhere accessible to backend

# Maybe other secrets for API keys, JWT secret, etc.
# JWT_SECRET=your_very_strong_secret_key
# STRIPE_SECRET_KEY=sk_live_...

# Database Credentials (used by Docker Compose 'db' service)
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_very_secure_password

# PocketBase Credentials (Optional, used by PocketBase container if added)
# POCKETBASE_ADMIN_EMAIL=admin@example.com
# POCKETBASE_ADMIN_PASSWORD=another_secure_password

# Frontend Build Variables (Only needed if passed as build args - see client Dockerfile)
# VITE_API_BASE_URL=https://yourdomain.com/api # Example if baking into build

6. GitHub Actions CD Workflow
 * Path: .github/workflows/cd.yml (You already have this file, replace its content)
 * Content:
name: CD Pipeline - Deploy to Production

on:
  push:
    branches:
      - main # Or your main deployment branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GHCR_TOKEN }} # Use the PAT secret

      - name: Define Image Tag
        id: vars
        run: echo "tag=$(git rev-parse --short HEAD)" >> $GITHUB_OUTPUT

      - name: Build and push Backend image
        uses: docker/build-push-action@v5
        with:
          context: ./apps/server
          push: true
          tags: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}/backend:${{ steps.vars.outputs.tag }}, ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}/backend:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Build and push Frontend image
        uses: docker/build-push-action@v5
        with:
          context: ./apps/client
          push: true
          tags: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}/frontend:${{ steps.vars.outputs.tag }}, ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}/frontend:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
          # Optional: Pass build args if needed
          # build-args: |
          #   VITE_API_BASE_URL=${{ secrets.VITE_API_BASE_URL }} # Get from secrets if sensitive/different per env

      - name: Deploy to Server via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            # Navigate to the app directory
            cd /opt/your-app # IMPORTANT: Adjust to your deployment path on the server

            # Set the tag environment variable for Docker Compose
            export TAG=${{ steps.vars.outputs.tag }}

            # Pull the latest images using the specific tag defined in docker-compose.prod.yml
            docker compose -f docker-compose.prod.yml pull

            # Optional: Put app in maintenance mode if you have a mechanism

            # Run database migrations inside the (newly pulled) backend container
            # Assumes 'backend' is the service name in compose file and 'pnpm run migrate' is the script
            echo "Running database migrations..."
            docker compose -f docker-compose.prod.yml exec -T backend pnpm run migrate # -T disables pseudo-tty allocation

            # Stop existing services and start new ones with the updated images
            echo "Restarting services..."
            docker compose -f docker-compose.prod.yml up -d --force-recreate --remove-orphans

            # Optional: Remove old unused images to save space
            echo "Pruning old Docker images..."
            docker image prune -af

            # Optional: Take app out of maintenance mode

            echo "Deployment successful!"


7. .dockerignore Files
Ensure you have .dockerignore files in both apps/client and apps/server to prevent copying unnecessary files into the build context, keeping images smaller and builds faster.
 * Path: apps/client/.dockerignore
 * Content:
.git
.github
.vscode
node_modules
dist
build
*.local
.env*
!/.env.example
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

 * Path: apps/server/.dockerignore
 * Content:
.git
.github
.vscode
node_modules
dist
*.local
.env*
!/.env.example
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
tests/

Copy these files into the specified paths in your project, replace the placeholders, set up your secrets, and configure your Ubuntu server with Docker, Docker Compose, and SSH access. This provides a solid foundation for your DevOps workflow.