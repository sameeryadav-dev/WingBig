import "bootstrap/dist/css/bootstrap.min.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <AuthProvider>

            <WishlistProvider>

                <CartProvider>
                    <App />
                </CartProvider>

            </WishlistProvider>

        </AuthProvider>

    </StrictMode>
);