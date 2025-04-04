// src/router.ts
import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from '@/routes/__root.tsx'
import { Route as indexRoute } from '@/routes/index.tsx'

// Combine routes into a tree
const routeTree = rootRoute.addChildren([indexRoute])

// Register types
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

}// Extend the route types to include meta
declare module '@tanstack/react-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    // Add other meta fields as needed
  }
}

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent' // Optional optimization
})