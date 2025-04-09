
// GET /api/v1/users/me
// Identical to /auth/session when using PocketBase auth provider.


// PUT /api/v1/users/me
// Updates user profile data. decides whether to update PocketBase record or Drizzle record.


// PATCH /api/v1/users/me/password
// Note: Strongly recommended to handle this client-side using PocketBase SDK's
// `requestPasswordReset` or `updatePassword` (which requires old password) flows
// for security. Proxying this can be risky if not done carefully.

// --- Address Management (Uses Drizzle DB) ---

// Helper to get user's addresses from Drizzle

// GET /api/v1/users/me/addresses

// POST /api/v1/users/me/addresses


// PUT /api/v1/users/me/addresses/:addressId


// DELETE /api/v1/users/me/addresses/:addressId
