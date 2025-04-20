// src/features/auth/api/authApi.ts
import {apiClient} from '@/lib/axios';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  SessionResponse,
  LogoutResponse,
  RequestPasswordResetPayload,
  RequestPasswordResetResponse
} from '../types'; // Use '../types' or '@/features/auth/types' based on alias setup

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  // Don't send passwordConfirm to the backend if it doesn't expect it
  const { passwordConfirm, ...dataToSend } = payload;
  const response = await apiClient.post<RegisterResponse>('/auth/register', dataToSend);
  return response.data;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const logoutUser = async (): Promise<LogoutResponse> => {
  // Logout is often just clearing client state, but call backend if it does something
  const response = await apiClient.post<LogoutResponse>('/auth/logout');
  return response.data;
};

export const fetchSession = async (): Promise<SessionResponse> => {
  // This relies on the Bearer token being set by the interceptor
  const response = await apiClient.get<SessionResponse>('/auth/session');
  return response.data;
};

export const requestPasswordResetEmail = async (payload: RequestPasswordResetPayload): Promise<RequestPasswordResetResponse> => {
    const response = await apiClient.post<RequestPasswordResetResponse>('/auth/request-password-reset', payload);
    return response.data;
};

// Placeholder implementations for other routes if needed later
// export const refreshToken = async () => { ... };
// export const verifyUserEmail = async (token: string) => { ... }; // Usually handled by link click
// export const resetUserPassword = async (token: string, payload: ResetPasswordPayload) => { ... }; // Handled by link click + form