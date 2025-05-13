# Stage 1: Build the application and prepare for migrations
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root package manager files and server's package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/

# Install all dependencies for the server workspace, including devDependencies
# (needed for typescript, tsc-alias, drizzle-kit)
RUN corepack enable && corepack prepare pnpm@9.1.2 --activate
RUN pnpm install --filter backend --frozen-lockfile --prod=false

# Copy the rest of the source code
# .dockerignore should prevent copying unnecessary files like node_modules from host
COPY . .
# Or more specific:
# COPY tsconfig.json ./
# COPY apps/server ./apps/server/

# Build the server application (tsc && tsc-alias)
RUN pnpm --filter backend run build
# TypeScript compiles to apps/server/dist

# Prune devDependencies for the final stage (optional, could also do a clean install in prod stage)
# RUN pnpm --filter backend prune --prod


# Stage 2: Production Image
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy root package manager files and server's package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/

# Install ONLY production dependencies for server
# AND drizzle-kit + pg for migrations. pg is peer dep for drizzle-kit with postgres.
RUN corepack enable && corepack prepare pnpm@9.1.2 --activate
RUN pnpm install --filter backend --prod --frozen-lockfile
RUN pnpm --filter backend add drizzle-kit pg # Add drizzle-kit and pg for migrations

# Copy built application from builder stage
COPY --from=builder /app/apps/server/dist ./apps/server/dist

# Copy migration files and Drizzle configuration from builder stage
# (or directly from context if .dockerignore is set up correctly)
COPY --from=builder /app/apps/server/src/db/migrations ./apps/server/src/db/migrations
COPY --from=builder /app/apps/server/drizzle.config.ts ./apps/server/drizzle.config.ts
# If you have a drizzle-kit.config.ts and it's used, copy it too.
# COPY --from=builder /app/apps/server/drizzle-kit.config.ts ./apps/server/drizzle-kit.config.ts

# Copy entrypoint script
COPY apps/server/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose the port the server listens on (defined by PORT env var, defaults to 4000)
EXPOSE 4000

# Run the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node", "apps/server/dist/index.js"] # Default command if entrypoint doesn't exec