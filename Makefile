.PHONY: build up down restart logs ps dev prod clean

# Default configuration - development
ENV_FILE ?= .env
-include $(ENV_FILE)
export

# Build all images (default to dev environment)
build:
	docker-compose -f infrastructure/docker/compose.dev.yml --env-file .env build

# Start all containers (default to dev environment)
up:
	docker-compose -f infrastructure/docker/compose.dev.yml --env-file .env up -d

# Stop all containers (default to dev environment)
down:
	docker-compose -f infrastructure/docker/compose.dev.yml --env-file .env down

# Restart all containers
restart: down up

# View logs
logs:
	docker-compose -f infrastructure/docker/compose.dev.yml logs -f

# Show running containers
ps:
	docker-compose -f infrastructure/docker/compose.dev.yml ps

# Run development environment
dev:
	docker-compose -f infrastructure/docker/compose.dev.yml up -d

# Run production environment
prod:
	docker-compose -f infrastructure/docker/compose.prod.yml up -d

# Clean up Docker resources
clean:
	docker-compose -f infrastructure/docker/compose.dev.yml down -v --rmi all

# Initialize database with seed data
seed-db:
	./scripts/seed-db.sh

# Run database migrations
migrate:
	./scripts/migrate.sh

# Check health of services
healthcheck:
	./scripts/healthcheck.sh

# Push images to registry (for CI/CD)
push-images:
	./scripts/push-images.sh

# Help command
help:
	@echo "Available commands (using infrastructure/docker configurations):"
	@echo "  make build        - Build Docker images (development)"
	@echo "  make up           - Start containers (development)"
	@echo "  make down         - Stop containers (development)"
	@echo "  make restart      - Restart containers (development)"
	@echo "  make logs         - View logs (development)"
	@echo "  make ps           - Show running containers (development)"
	@echo "  make dev          - Run development environment (same as 'up')"
	@echo "  make prod         - Run production environment"
	@echo "  make clean        - Clean up Docker resources (development)"
	@echo "  make seed-db      - Initialize database with seed data"
	@echo "  make migrate      - Run database migrations"
	@echo "  make healthcheck  - Check health of services"
	@echo "  make push-images  - Push images to registry"