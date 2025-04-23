// --- src/features/auth/components/RequestPasswordResetForm.tsx --- (Similar structure)
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestPasswordResetSchema } from '../validation/authSchemas';
import { RequestPasswordResetPayload } from '../types';
import { useAuth } from '@/hooks/useAuth';

export const RequestPasswordResetForm: React.FC = () => {
    const { requestPasswordReset, isLoading, error, clearError } = useAuth();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RequestPasswordResetPayload>({
        resolver: zodResolver(requestPasswordResetSchema),
        defaultValues: { email: '' },
    });

    const onSubmit: SubmitHandler<RequestPasswordResetPayload> = async (data) => {
        clearError(); // Assuming this comes from your auth context or local state
        setSuccessMessage(null); // Assuming this is local state in your component
    
        try {
            // Call the function. If it throws, the catch block will handle it.
            await requestPasswordReset(data);
    
            // If the await above completes WITHOUT throwing, it means success.
            // Set the success message directly.
            setSuccessMessage('If an account exists for this email, a password reset link has been sent.');
            reset(); // Clear the form on success (assuming 'reset' is from react-hook-form)
    
        } catch (err) {
            // The error should have already been handled (logged, state updated) by the handleError
            // within the requestPasswordReset function.
            // You might not even need to log it again here unless you want specific component context.
            console.error("Password Reset Request Component Caught:", err);
            // Ensure the success message is cleared if it was somehow set before the error occurred (unlikely here)
            setSuccessMessage(null);
            // No need to set error message here if it's handled globally by the context
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