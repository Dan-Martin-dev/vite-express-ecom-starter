// src/features/auth/types/index.ts

// Based on your Express schema/controllers
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin'; // Adjust roles as needed
    emailVerified?: Date | null;
    image?: string | null;
    // Add other fields from your 'users' table if needed by the frontend
    createdAt: string; // Dates often come as strings in JSON
    updatedAt: string;
  }
  
  // --- API Payloads ---
  export type RegisterPayload = Zod.infer<typeof import('../validation/authSchemas').registerSchema>;
  export type LoginPayload = Zod.infer<typeof import('../validation/authSchemas').loginSchema>;
  export type RequestPasswordResetPayload = Zod.infer<typeof import('../validation/authSchemas').requestPasswordResetSchema>;
  
  // --- API Responses ---
  export interface AuthResponse {
    message: string;
    user: User;
    token: string; // Assuming login returns token
  }
  
  export interface RegisterResponse {
    message: string;
    user: User; // Assuming register returns the created user
  }
  
  export interface SessionResponse {
    user: User;
    token: string;
  }
  
  export interface LogoutResponse {
    message: string;
  }
  
  export interface RequestPasswordResetResponse {
    message: string;
  }
  
  // --- Auth Context State ---
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean; // For initial session check and login/register processes
    error: string | null; // Store API error messages
  }
  
  // --- Auth Context Actions ---
  export interface AuthActions {
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
    requestPasswordReset: (payload: RequestPasswordResetPayload) => Promise<void>;
    checkSession: () => Promise<void>; // To check on app load
    clearError: () => void;
  }
  
  export interface AuthContextType extends AuthState, AuthActions {}