# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root package manager files and client's package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/

# Install dependencies for the client workspace
# Using --frozen-lockfile is recommended for CI/CD
# We need dev dependencies for building (typescript, vite etc.)
RUN corepack enable && corepack prepare pnpm@9.1.2 --activate
RUN pnpm install --filter frontend --frozen-lockfile --prod=false

# Copy the rest of the monorepo source. .dockerignore should handle exclusions.
# Or, copy only necessary parts:
COPY tsconfig.json ./
COPY apps/client ./apps/client/

# Set build-time environment variable for the API URL
ARG VITE_BASE_URL=/api
ENV VITE_BASE_URL=${VITE_BASE_URL}

# Build the client application
# The client's package.json has "build": "tsc -b && vite build"
# This command will be run in the context of /app/apps/client
RUN pnpm --filter frontend run build
# Vite builds to apps/client/dist by default

# Stage 2: Serve the application with Nginx
FROM nginx:1.25-alpine AS production

# Copy Nginx configuration
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the builder stage
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]