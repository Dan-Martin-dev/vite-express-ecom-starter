FROM node:20.11-alpine3.19 AS builder
ARG PNPM_VERSION=9.14.2
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./ 
COPY apps/server/package.json ./apps/server/
COPY packages ./packages/

# Install dependencies
RUN pnpm install --filter=./apps/server --frozen-lockfile

# Copy server source code
COPY apps/server ./apps/server

# Build the application
WORKDIR /app/apps/server
RUN pnpm run build

# Production stage
FROM node:20.11-alpine3.19 AS production

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files for production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./   
COPY apps/server/package.json ./apps/server/
COPY packages ./packages/

# Install only production dependencies
RUN pnpm install --filter=./apps/server --prod --frozen-lockfile --ignore-scripts

# Copy built files from builder stage
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY apps/server/drizzle ./apps/server/drizzle

# Add entrypoint script to run migrations before starting the server
COPY infrastructure/docker/server-entrypoint.sh .
RUN chmod +x server-entrypoint.sh

# Expose API port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production

# Run entrypoint script
ENTRYPOINT ["./server-entrypoint.sh"]