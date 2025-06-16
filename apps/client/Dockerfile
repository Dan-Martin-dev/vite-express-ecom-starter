# Build stage
FROM node:20.11-alpine3.19 AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
ARG PNPM_VERSION=9.14.2
RUN npm install -g pnpm@${PNPM_VERSION}

# Add build args for environment variables
ARG VITE_API_URL=/api

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./

COPY apps/client/package.json ./apps/client/
COPY packages ./packages/

# Install dependencies
RUN pnpm install --filter=client --frozen

# Copy client source code
COPY apps/client ./apps/client

# Replace environment variables in the code
RUN echo "VITE_API_URL=${VITE_API_URL}" > ./apps/client/.env

# Build the application
WORKDIR /app/apps/client
RUN pnpm build

# Production stage - use stable nginx alpine
FROM nginx:alpine

# Copy built assets to nginx
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

# Copy nginx configuration
COPY infrastructure/nginx/nginx.config /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]