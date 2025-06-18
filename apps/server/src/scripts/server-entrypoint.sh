#!/bin/sh
set -e

# Print banner
echo "Starting server application in $NODE_ENV environment..."

# Display debug information in development
if [ "$NODE_ENV" = "development" ]; then
  echo "--- ENV DEBUG INFO (DEV ONLY) ---"
  echo "DB_USER: [$DB_USER]"
  echo "DB_PASSWORD: [${DB_PASSWORD:0:4}****]"
  echo "DB_NAME: [$DB_NAME]"
  echo "POCKETBASE_URL: [$POCKETBASE_URL]"
  echo "DATABASE_URL: [PostgreSQL connection string hidden]"
  
  echo "Network diagnostic information:"
  ip addr
  echo "DNS resolution test:"
  getent hosts postgres pocketbase
  echo "Connection test:"
  echo "--- END DEBUG INFO ---"
fi

# Wait for database to be ready
echo "Waiting for database to be ready..."
until PGPASSWORD=$DB_PASSWORD psql -h postgres -U $DB_USER -d $DB_NAME -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
echo "Database connection established successfully."

# Wait for PocketBase to be ready
echo "Waiting for PocketBase to be ready..."
count=0
MAX_RETRIES=30
RETRY_DELAY=2

until curl -s -o /dev/null -w "%{http_code}" $POCKETBASE_URL/ | grep -q "200"; do
  count=$((count+1))
  if [ $count -ge $MAX_RETRIES ]; then
    echo "WARNING: Could not connect to PocketBase after $MAX_RETRIES attempts."
    echo "Will continue anyway, but PocketBase integration may fail."
    break
  fi
  echo "PocketBase connection attempt $count/$MAX_RETRIES failed. Retrying in ${RETRY_DELAY}s..."
  sleep $RETRY_DELAY
done

echo "Running database migrations..."
cd /app/apps/server
node dist/src/db/scripts/pre-migrate.js

echo "Starting server..."
cd /app/apps/server
exec node --inspect=0.0.0.0:9229 dist7/src/index.js