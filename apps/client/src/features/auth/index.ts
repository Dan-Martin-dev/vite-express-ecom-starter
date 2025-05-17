// src/features/auth/index.ts
export * from '@/pages/LoginPage';
export * from '@/pages/RegisterPage';
export * from '@/features/auth/hooks/useAuth';
// Export components if they need to be used directly outside the feature's pages
// export * from './components/LoginForm';
// Export types if needed globally (often better to keep them feature-specific)
// export * from './types';