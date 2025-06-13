FROM node:20-alpine AS builder
ARG PNPM_VERSION=9.14.2
RUN npm install -g pnpm@${PNPM_VERSION}

# Install TypeScript and necessary build tools
RUN npm install -g typescript tsc-alias

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./ 
COPY apps/server/package.json ./apps/server/
COPY packages ./packages/

# Install dependencies with correct flag
RUN pnpm install --filter=./apps/server --frozen

# Copy server source code
COPY apps/server ./apps/server

# Build the application
WORKDIR /app/apps/server
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

# Install necessary utilities for health checks, migrations, and network diagnostics
RUN apk add --no-cache postgresql-client curl netcat-openbsd

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Install pnpm globally with specific version
RUN npm install -g pnpm@9.14.2

# Copy package files for production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./   
COPY apps/server/package.json ./apps/server/
COPY packages ./packages/

# Install only production dependencies with correct flag
RUN pnpm install --filter=./apps/server --prod --frozen --ignore-scripts

# Copy built files from builder stage
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY apps/server/drizzle ./apps/server/drizzle

# Add entrypoint script to run migrations before starting the server
COPY infrastructure/docker/server-entrypoint.sh .
RUN chmod +x server-entrypoint.sh

# Change ownership of application files
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose API port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production

# Add HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/api/v1/health || exit 1

# Run entrypoint script
ENTRYPOINT ["./server-entrypoint.sh"]