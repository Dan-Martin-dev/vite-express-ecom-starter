#!/bin/sh
#vite-express-ecom-starter/infrastructure/docker/server-entrypoint.sh
set -e

# Initialize variables for environment-specific behavior
APP_ENV="${NODE_ENV:-development}"
RETRY_INTERVAL=2

# Check for required environment variables
if [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_NAME" ]; then
  echo "ERROR: Missing required environment variables. Please set DB_USER, DB_PASSWORD, and DB_NAME."
  exit 1
fi

echo "Starting server application in ${APP_ENV} environment..."

# Set database connection timeout based on environment
if [ "$APP_ENV" = "production" ]; then
  MAX_RETRIES=30  # Less retries in production - fail faster
  echo "Production mode: Will attempt database connection for ~${MAX_RETRIES} seconds"
else
  MAX_RETRIES=60  # More retries in development
  
  # Show detailed debug info only in dev
  echo "--- ENV DEBUG INFO (DEV ONLY) ---"
  echo "DB_USER: [${DB_USER}]"
  echo "DB_PASSWORD: [********]"
  echo "DB_NAME: [${DB_NAME}]"
  echo "POCKETBASE_URL: [${POCKETBASE_URL}]"
  echo "DATABASE_URL: [PostgreSQL connection string hidden]"
  
  # Debug network in dev only
  echo "Network diagnostic information:"
  ip addr show
  echo "DNS resolution test:"
  getent hosts postgres || echo "DNS resolution failed"
  echo "Connection test:"
  nc -zv postgres 5432 || echo "Connection test failed"
  echo "--- END DEBUG INFO ---"
fi

# Wait for database to be ready
echo "Waiting for database to be ready..."
count=0

until PGPASSWORD="${DB_PASSWORD}" psql -v ON_ERROR_STOP=1 -h postgres -U "${DB_USER}" -d "${DB_NAME}" -c "SELECT 1" > /dev/null 2>&1; do
  count=$((count+1))
  echo "Database connection attempt ${count}/${MAX_RETRIES} failed. Retrying in ${RETRY_INTERVAL}s..."
  
  if [ $count -ge $MAX_RETRIES ]; then
    echo "ERROR: Could not connect to database after ${MAX_RETRIES} attempts. Exiting."
    exit 1
  fi
  
  sleep $RETRY_INTERVAL
done

echo "Database connection established successfully."

# Run migrations
echo "Running database migrations..."
cd /app/apps/server

# First, ensure enum types exist
echo "Creating enum types if they don't exist..."
NODE_ENV=$APP_ENV node dist/db/scripts/pre-migrate.js

# Then run the main migrations
echo "Running main migrations..."
NODE_ENV=$APP_ENV node dist/db/scripts/run-migrations.js

# Start the server based on environment
echo "Starting server..."
if [ "$APP_ENV" = "development" ]; then
  # Development - for better debugging
  exec node --inspect=0.0.0.0:9229 dist/index.js
else
  # Production - standard start 
  exec node dist/index.js
fi