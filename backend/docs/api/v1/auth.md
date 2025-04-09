PocketBase Auth System Documentation
1. PocketBase SDK Setup

The pocketbase.ts file initializes the SDK and handles admin authentication, which is required for certain backend operations (e.g., user creation proxy).
2. isAuthenticated Middleware

    Extracts the Bearer token from the Authorization header.

    Verifies it against PocketBase using authRefresh (handles token validity and refreshing).

    Attaches the PocketBase user record (RecordModel) to req.user.

3. Client-Side Actions

    Registration, Login, Password Reset, Email Verification

        Best handled directly from the frontend using PocketBase’s JS SDK.

        Backend endpoints here act as proxies/placeholders (noted where client-side is preferred).

4. User Syncing

    When registering via /auth/register, ensure a corresponding record is created in your Drizzle users table.

    Use the PocketBase user ID as the primary key in PostgreSQL for easy linking.

5. Profile Updates (PUT /users/me)

    Updates both:

        PocketBase user record (for fields managed there).

        Drizzle user record (for PostgreSQL-specific fields).

    Adjust logic based on where profile attributes are stored.

6. Address Management

    Endpoints interact with the addresses JSONB field in Drizzle’s users table.

    Uses userId from the authenticated PocketBase token.

    Each address object in the JSON array has a simple id (crypto.randomUUID()) for updates/deletion.

7. Error Handling

    Basic error handling included, but implement centralized error middleware.

    PocketBase errors often contain useful details in error.response.

8. Input Validation

    Missing (for brevity) – Use zod to validate all:

        Request bodies.

        URL/query parameters.

9. Security Considerations

    Store PocketBase admin credentials securely (env variables).

    Distinguish between admin-privileged vs. user-authenticated operations.

    Password change endpoint requires careful security flow design.

10. JSONB Handling

    Updating JSONB arrays requires:

        Fetching the array.

        Modifying it in JavaScript.

        Writing the entire modified array back to the database.