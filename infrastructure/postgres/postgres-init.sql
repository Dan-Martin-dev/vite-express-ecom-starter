-- Using postgres variables, which are automatically populated from environment
-- No need to create a user as POSTGRES_USER will be automatically created by the postgres image

-- Grant privileges on the database (database name comes from POSTGRES_DB env var)
-- The \c command connects to the database specified by POSTGRES_DB
-- Grant privileges on all tables (current and future) to the user specified by POSTGRES_USER
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO :"POSTGRES_USER";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO :"POSTGRES_USER";
GRANT ALL PRIVILEGES ON SCHEMA public TO :"POSTGRES_USER";