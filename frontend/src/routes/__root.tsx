import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export const routeTree = createRootRoute({
  component: () => (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
})