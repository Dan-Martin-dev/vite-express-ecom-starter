    // --- src/features/auth/components/RegisterForm.tsx --- (Similar structure)
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validation/authSchemas';
import { RegisterPayload } from '../types';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const RegisterForm: React.FC = () => {
    const { register: registerUser, isLoading, error, clearError } = useAuth(); // Alias register to avoid conflict
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: '', password: '', passwordConfirm: '' },
    });

    const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
        clearError();
        try {
            await registerUser(data);
            // Navigation or success message handling done within registerUser
        } catch (err) {
            console.error("Register Component Caught:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
             {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <div>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" {...register('email')} onChange={clearError} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" {...register('password')} onChange={clearError}/>
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input id="passwordConfirm" type="password" {...register('passwordConfirm')} onChange={clearError} />
                {errors.passwordConfirm && <p style={{ color: 'red' }}>{errors.passwordConfirm.message}</p>}
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};
