import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '@/components/layout/header/header'
import Footer from '@/components/layout/footer/footer'
import { GlobalProvider } from '@/providers/GlobalProvider'

export const Route = createRootRoute({
  component: () => (
    <GlobalProvider>
      <div>
        <Header />
          <main> 
            <Outlet />
          </main>
        <Footer />
      </div>
    </GlobalProvider>
  ),
})