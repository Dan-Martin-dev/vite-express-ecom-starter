import { RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { StrictMode } from 'react'
import '@/App.css'
import { router } from '@/routes/router.tsx' // Updated import

export function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
      {import.meta.env.DEV && (
        <TanStackRouterDevtools 
          router={router} 
          position="bottom-right" 
        />
      )}
    </StrictMode>
  )
}