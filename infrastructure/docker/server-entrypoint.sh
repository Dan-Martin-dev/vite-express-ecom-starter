#!/bin/sh
set -e

# Wait for database to be ready
echo "Waiting for database to be ready..."
# Simple retry loop to wait for Postgres
MAX_RETRIES=30
RETRY_INTERVAL=2
count=0

until PGPASSWORD=$DB_PASSWORD psql -h postgres -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1" > /dev/null 2>&1; do
  count=$((count+1))
  if [ $count -ge $MAX_RETRIES ]; then
    echo "Failed to connect to database after $MAX_RETRIES attempts, exiting..."
    exit 1
  fi
  echo "Waiting for database connection... ($count/$MAX_RETRIES)"
  sleep $RETRY_INTERVAL
done

echo "Database is ready!"

# Run database migrations
echo "Running database migrations..."
cd /app/apps/server && pnpm run migrate

# Start the server
echo "Starting server..."
cd /app/apps/server && node dist/server.js