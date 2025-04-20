// src/features/auth/providers/AuthProvider.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  AuthContextType,
  AuthState,
  User,
  LoginPayload,
  RegisterPayload,
  RequestPasswordResetPayload,
} from "../types";
import * as authApi from "../api/authApi";
import { apiClient } from "@/lib/axios"; // For updating headers
import { toast } from "react-toastify";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken"), // Initialize token from storage
  isAuthenticated: false, // Will be updated by checkSession
  isLoading: true, // Start loading until session check is complete
  error: null,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate({ from: "/" });

  const updateAuthState = useCallback(
    (user: User | null, token: string | null) => {
      setState((prevState) => ({
        ...prevState,
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading: false,
        error: null,
      }));
      if (token) {
        localStorage.setItem("authToken", token);
        // Update Axios default header immediately (alternative to interceptor reliance)
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        localStorage.removeItem("authToken");
        delete apiClient.defaults.headers.common["Authorization"];
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const handleError = useCallback((error: unknown, defaultMessage: string) => {
    const message =
      error.response?.data?.message || error.message || defaultMessage;
    console.error("Auth Error:", message, error.response || error);
    setState((prev) => ({ ...prev, isLoading: false, error: message }));
    toast.error(message);
    setState((prev) => ({ ...prev, isLoading: false, error: message }));
    throw new Error(message); // Keep rethrowing to signal failure
  }, []);

  const checkSession = useCallback(async () => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      updateAuthState(null, null); // Ensure clean state if no token
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    // Set loading true only if we actually check the session
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Axios interceptor should add the token
      const { user, token } = await authApi.fetchSession();
      updateAuthState(user, token); // Update with potentially refreshed token
    } catch (error) {
      console.error("Session check failed:", error);
      updateAuthState(null, null); // Clear auth state on failure (e.g., invalid/expired token)
      // No need to set error state here, as it's a background check
    } finally {
      // Ensure loading is false even if updateAuthState wasn't called on error
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [updateAuthState]);

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const login = useCallback(
    async (payload: LoginPayload, redirectUrl?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { user, token } = await authApi.loginUser(payload);
        updateAuthState(user, token);
        navigate({ to: redirectUrl || "/dashboard", replace: true });
      } catch (error) {
        handleError(error, "Login failed. Please check your credentials.");
      }
    },
    [updateAuthState, navigate, handleError]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        // Decide if registration should automatically log the user in
        // If yes, backend should return user + token, else just user/message
        const response = await authApi.registerUser(payload); // Assuming it returns { user, message }
        // Option 1: Registration doesn't auto-login
        console.log("Registration successful:", response.message);
        setState((prev) => ({ ...prev, isLoading: false }));
        navigate({
          to: "/login",
          search: { message: "Registration successful! Please log in." },
          replace: true,
        });
        // Option 2: Registration auto-logins (adjust API response and types if needed)
        // if ('token' in response) { // Assuming backend sends token on register
        //     updateAuthState(response.user, response.token);
        //     navigate('/dashboard');
        // } else { ... handle non-autologin case ... }
      } catch (error) {
        handleError(error, "Registration failed. Please try again.");
      }
    },
    [navigate, handleError]
  ); // Removed updateAuthState if not auto-login

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Optional: Call backend logout endpoint if it invalidates tokens server-side
      await authApi.logoutUser();
    } catch (error) {
      console.error("Backend logout failed (might be okay):", error);
      // Proceed with client-side logout even if backend call fails
    } finally {
      updateAuthState(null, null);
      navigate({ to: "/login", replace: true });
      setState((prev) => ({ ...prev, isLoading: false })); // Ensure loading is off
    }
  }, [updateAuthState, navigate]);

  const requestPasswordReset = useCallback(
    async (payload: RequestPasswordResetPayload): Promise<void> => {
      // Explicitly type return as Promise<void>
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await authApi.requestPasswordResetEmail(payload);
        console.log("Password reset requested:", response.message);
        setState((prev) => ({ ...prev, isLoading: false }));
        // Optionally show a success message to the user via other means (e.g., state update, toast notification)
        // navigate('/login', { state: { message: 'Password reset email sent!' } });
        // DO NOT return response.message;
      } catch (error) {
        handleError(
          error,
          "Failed to request password reset. Please try again."
        );
        // Rethrowing handled by handleError, which rejects the promise
      }
    },
    [handleError]
  );

  // IMPORTANT: Provide the context value (including auth state and actions)

  const authContextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    checkSession,
    requestPasswordReset,
    clearError,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
