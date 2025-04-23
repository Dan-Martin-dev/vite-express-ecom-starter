// src/features/auth/hooks/useAuth.ts
import { useContext } from 'react';
// Import AuthContext from the provider file (since it's now exported)
import { AuthContext } from '@/features/auth/providers/AuthProvider';
// Import AuthContextType DIRECTLY from the types file
import { AuthContextType } from '@/features/auth/types';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};