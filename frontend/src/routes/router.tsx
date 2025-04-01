import { routeTree } from '@/routes/__root'
import { createRouter } from '@tanstack/react-router'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Register for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}