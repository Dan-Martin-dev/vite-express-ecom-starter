import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { GlobalProvider } from '@/providers/GlobalProvider'
import "/home/vare/project/microservices_1/ecommerce_1/vite-express-ecom-starter/apps/client/src/index.css";

export const Route = createRootRoute({
  component: () => (
    <GlobalProvider>
      <div>
        <Header />
          <main> {/* Good practice to wrap main content */}
            <Outlet />
          </main>
        <Footer />
      </div>
    </GlobalProvider>
  ),
})