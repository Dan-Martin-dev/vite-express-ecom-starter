import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root'
import Login from '@/pages/LoginPage';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
  validateSearch: (search: Record<string, unknown>): { redirect?: string; message?: string } => {
    return {
      redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
      message: typeof search.message === 'string' ? search.message : undefined,
    }
  },
});