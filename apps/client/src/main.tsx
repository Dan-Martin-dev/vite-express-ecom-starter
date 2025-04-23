import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App}  from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from "./providers/GlobalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <GlobalProvider>
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
        </GlobalProvider>
  </StrictMode>
);
