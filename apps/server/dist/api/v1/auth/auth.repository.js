import { pb } from '@/lib/pocketbase.js'; // Added .js extension
import { ClientResponseError } from 'pocketbase';
export class AuthRepository {
    usersCollection = 'users'; // Or your specific PocketBase collection name
    /**
     * Creates a new user record in PocketBase.
     * @param userData - The data for the new user (e.g., email, password).
     * @returns The newly created user record.
     * @throws {ClientResponseError} If PocketBase returns an error (e.g., email already exists).
     */
    async createUser(userData) {
        try {
            // PocketBase automatically handles password hashing.
            // 'emailVisibility' is often true by default, adjust if needed.
            // Add any other required fields for your 'users' collection.
            const record = await pb.collection(this.usersCollection).create({
                email: userData.email,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm, // PocketBase requires this for creation
                // Add other fields like name, username if your collection has them
                // name: userData.name,
            });
            return record;
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                console.error('PocketBase Create User Error:', error.originalError);
                // Rethrow the specific PocketBase error for the service layer to handle
                throw error;
            }
            // Throw a generic error for unexpected issues
            console.error('Unexpected error creating user:', error);
            throw new Error('Failed to create user due to an unexpected error.');
        }
    }
    /**
     * Authenticates a user with email and password using PocketBase.
     * @param loginData - The user's login credentials (email, password).
     * @returns The authentication record containing the user model and token.
     * @throws {ClientResponseError} If PocketBase returns an error (e.g., invalid credentials).
     */
    async authenticateUser(loginData) {
        try {
            const authData = await pb.collection(this.usersCollection).authWithPassword(loginData.email, loginData.password);
            // authData includes the record and the token
            return authData;
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                console.error('PocketBase Auth Error:', error.originalError);
                // Rethrow the specific PocketBase error
                throw error;
            }
            // Throw a generic error for unexpected issues
            console.error('Unexpected error during authentication:', error);
            throw new Error('Failed to authenticate user due to an unexpected error.');
        }
    }
    /**
     * Finds a user by their email address.
     * Useful for checking if a user already exists before creation.
     * @param email - The email address to search for.
     * @returns The user record if found, otherwise null.
     */
    async findUserByEmail(email) {
        try {
            const record = await pb.collection(this.usersCollection).getFirstListItem(`email="${email}"`);
            return record;
        }
        catch (error) {
            if (error instanceof ClientResponseError && error.status === 404) {
                // User not found is not an error in this context
                return null;
            }
            console.error('Error finding user by email:', error);
            throw error; // Rethrow other errors
        }
    }
    /**
     * Initiates the password reset process for a user via PocketBase.
     * @param email - The email of the user requesting the reset.
     * @returns A promise that resolves when the request is successfully sent.
     * @throws {ClientResponseError} If PocketBase returns an error.
     */
    async requestPasswordReset(email) {
        try {
            // PocketBase handles sending the email
            await pb.collection(this.usersCollection).requestPasswordReset(email);
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                console.error('PocketBase Password Reset Request Error:', error.originalError);
                // Rethrow the specific PocketBase error
                throw error;
            }
            // Throw a generic error for unexpected issues
            console.error('Unexpected error requesting password reset:', error);
            throw new Error('Failed to request password reset due to an unexpected error.');
        }
    }
}
// Export an instance if you prefer singleton pattern
export const authRepository = new AuthRepository();
//# sourceMappingURL=auth.repository.js.map