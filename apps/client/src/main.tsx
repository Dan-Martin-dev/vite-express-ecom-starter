import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App}  from "./App.tsx";
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/router'; // Adjust path if needed

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
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
  </StrictMode>
);
