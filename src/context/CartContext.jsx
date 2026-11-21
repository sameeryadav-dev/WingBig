import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

import {
    getCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
} from "../services/CartServices";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const { isLoggedIn, loading: authLoading } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    // Fetch Cart
    const fetchCart = async () => {
        if (!isLoggedIn) return;

        try {
            const data = await getCart();

            setCartItems(data.items || []);

            const count = (data.items || []).reduce(
                (total, item) => total + item.quantity,
                0
            );

            setCartCount(count);
            setTotalAmount(data.totalAmount || 0);

        } catch (error) {
            console.log("Error fetching cart:", error);
        }
    };

    // Add to Cart
    const addBikeToCart = async (bikeId) => {
        await addToCart(bikeId);
        await fetchCart();
    };

    // Update Quantity
    const changeQuantity = async (bikeId, quantity) => {
        await updateCartQuantity(bikeId, quantity);
        await fetchCart();
    };

    // Remove from Cart
    const deleteCartItem = async (bikeId) => {
        await removeFromCart(bikeId);
        await fetchCart();
    };

    // Clear Cart
    const emptyCart = async () => {
        await clearCart();
        await fetchCart();
    };

    // Load the cart for the logged-in user; clear it on logout
    useEffect(() => {
        if (authLoading) return;

        if (isLoggedIn) {
            fetchCart();
        } else {
            setCartItems([]);
            setCartCount(0);
            setTotalAmount(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, authLoading]);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            totalAmount,
            fetchCart,
            addBikeToCart,
            changeQuantity,
            deleteCartItem,
            emptyCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);