#!/bin/bash

# Login to Docker Hub (or your private registry)
echo "Logging in to Docker Hub..."
docker login -u YOUR_DOCKER_USERNAME

# Build and push Frontend
echo "Building frontend..."
docker build -t YOUR_DOCKER_USERNAME/vite-express-ecom-frontend:latest ./client

echo "Pushing frontend..."
docker push YOUR_DOCKER_USERNAME/vite-express-ecom-frontend:latest

# Build and push Backend
echo "Building backend..."
docker build -t YOUR_DOCKER_USERNAME/vite-express-ecom-backend:latest ./server

echo "Pushing backend..."
docker push YOUR_DOCKER_USERNAME/vite-express-ecom-backend:latest

echo "Done!"