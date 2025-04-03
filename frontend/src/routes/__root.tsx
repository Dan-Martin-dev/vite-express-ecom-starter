import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export const Route = createRootRoute({
  component: () => (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
})