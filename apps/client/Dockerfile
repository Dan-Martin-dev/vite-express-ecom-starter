# Stage 1: Install production deps
FROM node:20 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

# Stage 2: Build TypeScript
FROM node:20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && \
    rm -rf src test *.md tsconfig.json  # ← Clean build artifacts

# Stage 3: Minimal production image
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy runtime essentials
COPY --from=deps /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Security hardening
RUN apk add --no-cache tini && \
    chown -R node:node /app
USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/server.js"]