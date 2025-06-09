# Build stage
FROM node:20.11-alpine3.19 AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./

COPY apps/client/package.json ./apps/client/
COPY packages ./packages/

# Install dependencies
RUN pnpm install --filter=client --frozen-lockfile

# Copy client source code
COPY apps/client ./apps/client

# Build the application
WORKDIR /app/apps/client
RUN pnpm build

# Production stage
FROM nginx:1.25-alpine

# Copy built assets to nginx
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

# Copy nginx configuration
COPY infrastructure/nginx/nginx.config /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]