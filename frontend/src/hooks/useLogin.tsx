import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth'; // Your API function

export const useLogin = () => {
  const { setIsAuthenticated } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => 
      loginUser(credentials),
    onSuccess: (data) => {
      // Store token, update state
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      // Handle errors (show toast)
      console.error('Login failed:', error);
    },
  });

  return {
    ...loginMutation,
    isClient: typeof window !== 'undefined', // Simplify this check
  };
};