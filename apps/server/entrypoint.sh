#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Run pre-migration script (assuming it's compiled to JS by tsc)
echo "Running pre-migration script..."
node apps/server/dist/db/scripts/pre-migrate.js

# Run database migrations
echo "Running database migrations..."
# drizzle-kit needs to know where the config is.
# The package.json script `migrate` is just `drizzle-kit migrate`.
# This implies drizzle.config.ts is at a location drizzle-kit finds by default,
# or its path is specified in drizzle-kit's own config.
# Assuming drizzle.config.ts is at apps/server/drizzle.config.ts
./apps/server/node_modules/.bin/drizzle-kit migrate --config=apps/server/drizzle.config.ts

# Start the main application (passed as CMD)
echo "Starting server application..."
exec "$@"