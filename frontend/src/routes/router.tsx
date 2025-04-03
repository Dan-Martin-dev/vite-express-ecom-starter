// src/router.ts
import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from '@/routes/__root.tsx'
import { Route as indexRoute } from '@/routes/index.tsx'

// Combine routes into a tree
const routeTree = rootRoute.addChildren([indexRoute])

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent' // Optional optimization
})

// Register types
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}