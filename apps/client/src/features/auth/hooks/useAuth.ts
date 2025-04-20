// src/features/auth/hooks/useAuth.ts
import { useContext } from 'react';
// Import AuthContext from the provider file (since it's now exported)
import { AuthContext } from '../providers/AuthProvider'; // Corrected import path if needed

// Import AuthContextType DIRECTLY from the types file
import { AuthContextType } from '../types'; // Adjust path to your types file (e.g., ../types/index.ts)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};