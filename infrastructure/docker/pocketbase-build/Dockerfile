      
# Use a minimal base image like Alpine
FROM alpine:latest

WORKDIR /app

# Copy the downloaded PocketBase binary into the container's /app directory
COPY pocketbase /app/pocketbase

# Make the binary executable
RUN chmod +x /app/pocketbase

# Optional: Create directories for data and migrations if PocketBase needs them
# These are good practice if you map volumes to these locations later
RUN mkdir -p /app/pb_data /app/pb_migrations

# Add necessary dependencies for the healthcheck (wget)
RUN apk --no-cache add wget

# Expose the default PocketBase port (8090)
EXPOSE 8090

# Set the entrypoint to the PocketBase binary
ENTRYPOINT ["/app/pocketbase"]

# Default command for the container (can be overridden in docker-compose)
# This serves the API on 0.0.0.0:8090
CMD ["serve", "--http=0.0.0.0:8090"]
        
# Note: The 'command' in your docker-compose.dev.yml will override the CMD here
# That's intentional to add the --dev flag

    