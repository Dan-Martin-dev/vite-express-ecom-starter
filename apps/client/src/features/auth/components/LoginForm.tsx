// src/features/auth/components/LoginForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/authSchemas';
import { LoginPayload } from '../types';
import { useAuth } from '@/hooks/useAuth';

export const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    clearError(); // Clear previous errors before attempting
    try {
      await login(data);
      // Navigation happens inside the login function on success
    } catch (err) {
      // Error is set in the context by the login function's handleError
      console.error("Login Component Caught:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          onChange={clearError} // Clear error on input change
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
           onChange={clearError}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};