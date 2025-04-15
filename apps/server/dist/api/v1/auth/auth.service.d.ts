import { AuthRepository } from './auth.repository.js';
import { UserCreateData, UserLoginData, PocketBaseAuthResponse } from './auth.types.js';
export declare class AuthService {
    private repository;
    constructor(repository?: AuthRepository);
    /**
     * Registers a new user.
     * Checks if the user already exists before attempting creation.
     * @param userData - Data for the new user.
     * @returns The newly created user record (excluding sensitive info like password).
     * @throws {HttpError} If email is already taken or other registration errors occur.
     */
    registerUser(userData: UserCreateData): Promise<{
        [key: string]: any;
        collectionId: string;
        collectionName: string;
        expand?: {
            [key: string]: any;
        };
        id: string;
    }>;
    /**
     * Logs in a user.
     * @param loginData - User's login credentials.
     * @returns Authentication data including the user record and JWT token.
     * @throws {HttpError} If login fails (invalid credentials, etc.).
     */
    loginUser(loginData: UserLoginData): Promise<PocketBaseAuthResponse>;
    /**
     * Requests a password reset email for the given email address.
     * @param email - The email address of the user.
     * @returns A success message.
     * @throws {HttpError} If the user is not found or an error occurs.
     */
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    /**
     * Placeholder for clearing server-side auth state if needed (e.g., session store).
     * PocketBase token invalidation is typically handled client-side by discarding the token.
     */
    clearServerAuthStore(): void;
}
export declare const authService: AuthService;
