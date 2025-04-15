import { authRepository } from './auth.repository.js';
import { ClientResponseError } from 'pocketbase';
import { HttpError } from '../../../lib/errors/HttpError.js';
export class AuthService {
    repository;
    // Dependency injection can be used here for better testability
    constructor(repository = authRepository) {
        this.repository = repository;
    }
    /**
     * Registers a new user.
     * Checks if the user already exists before attempting creation.
     * @param userData - Data for the new user.
     * @returns The newly created user record (excluding sensitive info like password).
     * @throws {HttpError} If email is already taken or other registration errors occur.
     */
    async registerUser(userData) {
        // 1. Check if user already exists
        const existingUser = await this.repository.findUserByEmail(userData.email);
        if (existingUser) {
            throw new HttpError(409, 'Conflict: Email address is already registered.');
        }
        // 2. Attempt to create user via repository
        try {
            const newUserRecord = await this.repository.createUser(userData);
            // Exclude password fields before returning
            const { password, passwordConfirm, ...safeUserData } = newUserRecord;
            return safeUserData;
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                // Handle specific PocketBase errors
                // Example: PocketBase might return 400 for various validation issues
                console.error('PocketBase registration error:', error.originalError);
                // You might want to parse error.originalError.data for specific field errors
                throw new HttpError(error.status || 400, `Registration failed: ${error.message}`);
            }
            console.error('Unexpected error during registration:', error);
            throw new HttpError(500, 'Internal Server Error: Could not register user.');
        }
    }
    /**
     * Logs in a user.
     * @param loginData - User's login credentials.
     * @returns Authentication data including the user record and JWT token.
     * @throws {HttpError} If login fails (invalid credentials, etc.).
     */
    async loginUser(loginData) {
        try {
            const authData = await this.repository.authenticateUser(loginData);
            // Ensure the response matches the expected type (may need casting or mapping)
            // PocketBase's authWithPassword returns AuthModel which includes token and model (record)
            return {
                token: authData.token,
                record: {
                    id: authData.record.id,
                    email: authData.record.email,
                    created: authData.record.created,
                    updated: authData.record.updated,
                    // Map other relevant fields from authData.record based on AuthenticatedUser interface
                }
            };
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                console.error('PocketBase login error:', error.originalError);
                if (error.status === 400 || error.status === 401) { // PocketBase often uses 400 for failed auth
                    throw new HttpError(401, 'Unauthorized: Invalid email or password.');
                }
                throw new HttpError(error.status || 500, `Login failed: ${error.message}`);
            }
            console.error('Unexpected error during login:', error);
            throw new HttpError(500, 'Internal Server Error: Could not log in user.');
        }
    }
    /**
     * Requests a password reset email for the given email address.
     * @param email - The email address of the user.
     * @returns A success message.
     * @throws {HttpError} If the user is not found or an error occurs.
     */
    async requestPasswordReset(email) {
        // Optional: Check if user exists first, though PocketBase might handle this.
        // const user = await this.repository.findUserByEmail(email);
        // if (!user) {
        //     // Avoid revealing if email exists - send generic success or throw specific error?
        //     // For now, let PocketBase handle it.
        // }
        try {
            await this.repository.requestPasswordReset(email);
            // Return a generic success message to avoid leaking information about email existence
            return { message: 'If an account with this email exists, a password reset link has been sent.' };
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                console.error('PocketBase password reset request error:', error.originalError);
                // PocketBase might return 404 if user not found, or other errors.
                // Decide if you want to expose this or always return generic success/error.
                // Let's throw a generic internal error for now.
                throw new HttpError(500, 'Internal Server Error: Could not process password reset request.');
            }
            console.error('Unexpected error during password reset request:', error);
            throw new HttpError(500, 'Internal Server Error: Could not process password reset request.');
        }
    }
    /**
     * Placeholder for clearing server-side auth state if needed (e.g., session store).
     * PocketBase token invalidation is typically handled client-side by discarding the token.
     */
    clearServerAuthStore() {
        // Implement if you have server-side session management related to auth
        console.log('Clearing server auth store (if applicable)...');
    }
}
// Export an instance
export const authService = new AuthService();
//# sourceMappingURL=auth.service.js.map