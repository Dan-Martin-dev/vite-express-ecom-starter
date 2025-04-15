import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '@/components/layout/header/header'
import Footer from '@/components/layout/footer/footer'

export const Route = createRootRoute({
  component: () => (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
})