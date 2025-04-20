// --- src/features/auth/components/RequestPasswordResetForm.tsx --- (Similar structure)
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestPasswordResetSchema } from '../validation/authSchemas';
import { RequestPasswordResetPayload } from '../types';
import { useAuth } from '../hooks/useAuth';

export const RequestPasswordResetForm: React.FC = () => {
    const { requestPasswordReset, isLoading, error, clearError } = useAuth();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RequestPasswordResetPayload>({
        resolver: zodResolver(requestPasswordResetSchema),
        defaultValues: { email: '' },
    });

    const onSubmit: SubmitHandler<RequestPasswordResetPayload> = async (data) => {
        clearError();
        setSuccessMessage(null);
        try {
            const message = await requestPasswordReset(data);
            setSuccessMessage(message || 'If an account exists for this email, a password reset link has been sent.');
            reset(); // Clear the form on success
        } catch (err) {
            console.error("Password Reset Request Component Caught:", err);
             // Error state is handled by useAuth hook
             setSuccessMessage(null); // Ensure success message is cleared on error
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Request Password Reset</h2>
             {error && <p style={{ color: 'red' }}>Error: {error}</p>}
             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <div>
                <label htmlFor="reset-email">Email</label>
                <input
                    id="reset-email"
                    type="email"
                    {...register('email')}
                    onChange={() => { clearError(); setSuccessMessage(null); }}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
        </form>
    );
};