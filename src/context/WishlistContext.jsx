import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "../services/WishlistServices";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { isLoggedIn, loading: authLoading } = useAuth();
    const [wishlistCount, setWishlistCount] = useState(0);
    const [wishlistBikeIds, setWishlistBikeIds] = useState([]);

    const fetchWishlistCount = async () => {
        if (!isLoggedIn) return;

        try {
            const data = await getWishlist();

            setWishlistCount(data.length);

            setWishlistBikeIds(data.map(item => item.bikeId));
        } catch (error) {
            console.log("Error fetching wishlist:", error);
        }
    };

    // Load the wishlist for the logged-in user; clear it on logout
    useEffect(() => {
        if (authLoading) return;

        if (isLoggedIn) {
            fetchWishlistCount();
        } else {
            setWishlistCount(0);
            setWishlistBikeIds([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, authLoading]);

    return (
        <WishlistContext.Provider
            value={{
                wishlistCount,
                setWishlistCount,
                wishlistBikeIds,
                fetchWishlistCount
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);