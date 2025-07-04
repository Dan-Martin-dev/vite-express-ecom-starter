-- Create the custom user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'vite_ecom_user') THEN
        CREATE USER vite_ecom_user WITH PASSWORD 'bcdOYrB2vimRakexBwTOSsTGIe72wdSm';
    END IF;
END
$$;

-- Grant privileges to the user on the database
GRANT ALL PRIVILEGES ON DATABASE "vite-ecom" TO vite_ecom_user;

-- Connect to the database to set schema permissions
\c "vite-ecom";

-- Grant privileges on all tables (current and future)
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO vite_ecom_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO vite_ecom_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO vite_ecom_user;
