import { UserCreateData, UserLoginData } from './auth.types.js';
export declare class AuthRepository {
    private usersCollection;
    /**
     * Creates a new user record in PocketBase.
     * @param userData - The data for the new user (e.g., email, password).
     * @returns The newly created user record.
     * @throws {ClientResponseError} If PocketBase returns an error (e.g., email already exists).
     */
    createUser(userData: UserCreateData): Promise<import("pocketbase").RecordModel>;
    /**
     * Authenticates a user with email and password using PocketBase.
     * @param loginData - The user's login credentials (email, password).
     * @returns The authentication record containing the user model and token.
     * @throws {ClientResponseError} If PocketBase returns an error (e.g., invalid credentials).
     */
    authenticateUser(loginData: UserLoginData): Promise<import("pocketbase").RecordAuthResponse<import("pocketbase").RecordModel>>;
    /**
     * Finds a user by their email address.
     * Useful for checking if a user already exists before creation.
     * @param email - The email address to search for.
     * @returns The user record if found, otherwise null.
     */
    findUserByEmail(email: string): Promise<import("pocketbase").RecordModel | null>;
    /**
     * Initiates the password reset process for a user via PocketBase.
     * @param email - The email of the user requesting the reset.
     * @returns A promise that resolves when the request is successfully sent.
     * @throws {ClientResponseError} If PocketBase returns an error.
     */
    requestPasswordReset(email: string): Promise<void>;
}
export declare const authRepository: AuthRepository;
