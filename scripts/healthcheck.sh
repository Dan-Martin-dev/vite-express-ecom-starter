#!/bin/bash

# Health check script for checking the status of services

echo "Running health checks..."
echo "----------------------"

# Check if Docker is running
echo "Checking Docker service:"
if docker info >/dev/null 2>&1; then
  echo "✅ Docker is running"
else
  echo "❌ Docker is NOT running"
  exit 1
fi

# Check if the containers are running
echo -e "\nChecking container status:"
CONTAINERS=("ecommerce_client" "ecommerce_server" "ecommerce_postgres" "ecommerce_pocketbase")

for CONTAINER in "${CONTAINERS[@]}"; do
  if docker ps | grep -q "$CONTAINER"; then
    echo "✅ $CONTAINER is running"
  else
    echo "❌ $CONTAINER is NOT running"
  fi
done

# Check container health status
echo -e "\nChecking container health:"
for CONTAINER in "${CONTAINERS[@]}"; do
  HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null)
  
  if [ $? -eq 0 ] && [ -n "$HEALTH_STATUS" ]; then
    if [ "$HEALTH_STATUS" == "healthy" ]; then
      echo "✅ $CONTAINER is healthy"
    else
      echo "❌ $CONTAINER health status: $HEALTH_STATUS"
    fi
  else
    echo "ℹ️ $CONTAINER has no health check defined"
  fi
done

# Check if services are responding
echo -e "\nChecking service endpoints:"

# Check server API endpoint
SERVER_URL="http://localhost:4000/api/v1/health"
if curl -s -f "$SERVER_URL" >/dev/null 2>&1; then
  echo "✅ Server API is responding"
else
  echo "❌ Server API is NOT responding"
fi

# Check client app
CLIENT_URL="http://localhost:80"
if curl -s -f -I "$CLIENT_URL" >/dev/null 2>&1; then
  echo "✅ Client app is responding"
else
  echo "❌ Client app is NOT responding"
fi

# Check Pocketbase
PB_URL="http://localhost:8090/api/health"
if curl -s -f "$PB_URL" >/dev/null 2>&1; then
  echo "✅ Pocketbase is responding"
else
  echo "❌ Pocketbase is NOT responding"
fi

echo -e "\nHealth check complete!"