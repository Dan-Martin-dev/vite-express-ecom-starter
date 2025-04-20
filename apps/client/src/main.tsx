import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App}  from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.tsx";
import { AuthProvider } from '@/features/auth/providers/AuthProvider.tsx'; // Import provider and context hook
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ShopContextProvider>
        <BrowserRouter>
          <App />
          <ToastContainer
              position="top-right" // Or your preferred position
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light" // Or "dark" or "colored"
          />
        </BrowserRouter>
      </ShopContextProvider>
    </AuthProvider>
  </StrictMode>
);
