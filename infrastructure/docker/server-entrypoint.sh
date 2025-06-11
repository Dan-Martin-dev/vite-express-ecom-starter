# /home/vare/project/ecom_101/ecommerce_1/vite-express-ecom-starter/infrastructure/docker/server-entrypoint.sh
#!/bin/sh
set -e

echo "--- SERVER ENTRYPOINT SCRIPT START ---"
echo "DB_USER from env: [${DB_USER}]"
echo "DB_PASSWORD from env: [********]" # Hide password in logs
echo "DB_NAME from env: [${DB_NAME}]"
echo "POCKETBASE_URL from env: [${POCKETBASE_URL}]"
echo "DATABASE_URL from env: [${DATABASE_URL}]"
echo "--- END ENV VARS ---"

# Add network debugging
echo "Network diagnostic information:"
ip addr show
echo "DNS resolution test:"
nslookup postgres || true
echo "Ping test:"
ping -c 2 postgres || true

# Wait for database to be ready
echo "Waiting for database to be ready..."
# Simple retry loop to wait for Postgres
MAX_RETRIES=60
RETRY_INTERVAL=2
count=0

# Try connecting via direct TCP connection first
echo "Testing TCP connection to postgres:5432..."
nc -zv postgres 5432 || echo "Cannot establish TCP connection to postgres:5432"

# Try connecting via psql directly with verbose output
until PGPASSWORD="${DB_PASSWORD}" psql -v ON_ERROR_STOP=1 -h postgres -U "${DB_USER}" -d "${DB_NAME}" -c "SELECT 1" > /dev/null 2>&1; do
  echo "PSQL connection attempt failed. Retrying..."
  count=$((count+1))
  if [ $count -ge $MAX_RETRIES ]; then
    echo "Failed to connect to database after $MAX_RETRIES attempts, exiting..."
    echo "Current PostgreSQL connection details:"
    echo "Host: postgres"
    echo "User: ${DB_USER}"
    echo "Database: ${DB_NAME}"
    echo "Command: PGPASSWORD=***** psql -h postgres -U ${DB_USER} -d ${DB_NAME} -c \"SELECT 1\""
    
    # Try with different options as a last resort
    echo "Attempting connection with different options:"
    PGPASSWORD="${DB_PASSWORD}" psql "postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}" -c "SELECT 1" || echo "Failed with connection string"
    
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
cd /app/apps/server

# Check what files are available
echo "Checking for entry point files..."
ls -la dist/

if [ -f "dist/server.js" ]; then
  echo "Found server.js, starting..."
  node dist/server.js
elif [ -f "dist/index.js" ]; then
  echo "Found index.js, starting..."
  node dist/index.js
else
  echo "No entry point found in dist directory."
  exit 1
fi