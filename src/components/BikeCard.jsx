import { useNavigate } from "react-router-dom";
import { deleteBike } from "../services/BikeServices";
import {addToWishlist,removeFromWishlist} from "../services/WishlistServices";
import { buyNow } from "../services/OrderServices";
import { useAuth } from "../context/AuthContext";

import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function BikeCard({ bike }) {

    const navigate = useNavigate();

        const { addBikeToCart, fetchCart } = useCart();

    const { fetchWishlistCount, wishlistBikeIds } = useWishlist();

    const isWishlisted = wishlistBikeIds.includes(bike.id);

    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [buyLoading, setBuyLoading] = useState(false);
    const { isAdmin, isLoggedIn } = useAuth();

    // Wishlist / Cart / Buy Now need a logged-in user
    const requireLogin = () => {
        if (isLoggedIn) return true;

        alert("Please login to continue");
        navigate("/login");
        return false;
    };

    // Delete Bike
    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bike?"
        );

        if (!confirmDelete) return;

        try {
            await deleteBike(bike.id);
            alert("Bike deleted successfully!");
            window.location.reload();

        } catch (error) {
            console.log("Error deleting bike:", error);
        }
    };

    // Wishlist
    const handleWishlist = async () => {

        if (!requireLogin()) return;

        try {
            setWishlistLoading(true);

            if (isWishlisted) {
                await removeFromWishlist(bike.id);
                alert("Bike removed from wishlist!");
            } else {
                await addToWishlist(bike.id);
                alert("Bike added to wishlist!");
            }

            await fetchWishlistCount();

        } catch (error) {
            alert(error.message);

        } finally {
            setWishlistLoading(false);
        }
    };

    // Add to Cart
    const handleAddToCart = async () => {

        if (!requireLogin()) return;

        try {
            await addBikeToCart(bike.id);
            alert("Bike added to cart successfully!");

        } catch (error) {
            alert(error.message);
        }
    };

    // Buy Now
    const handleBuyNow = async () => {

        if (!requireLogin()) return;

        try {
            setBuyLoading(true);

            const order = await buyNow(bike.id);

            // The bike is removed from the cart and the wishlist
            await fetchCart();
            await fetchWishlistCount();

        } catch (error) {
            alert(error.message);

        } finally {
            setBuyLoading(false);
        }
    };

    return (

        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

            <img
                src={bike.image}
                className="card-img-top"
                alt={bike.name}
                style={{
                    height: "200px",
                    objectFit: "cover"
                }}
            />

            <div className="card-body d-flex flex-column p-3">

                {/* Bike Information */}
                <div>

                    <h5 className="card-title fw-bold mb-2">
                        {bike.name}
                    </h5>

                    <p className="text-muted mb-1">
                        <strong>Brand:</strong> {bike.brand}
                    </p>

                    <p className="text-muted mb-1">
                        <strong>Engine:</strong> {bike.engine} CC
                    </p>

                    <h5 className="text-success fw-bold mt-3">
                        ₹{Number(bike.price).toLocaleString("en-IN")}
                    </h5>

                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-3">

                    {/* View, Edit, Delete */}
                    <div className="d-flex flex-wrap gap-2 mb-3">

                        <button
                            className="btn btn-dark btn-sm flex-fill rounded-3"
                            onClick={() => navigate(`/bike/${bike.id}`)}
                        >
                            👁 View
                        </button>

                        {isAdmin && (
                             <>
                           <button
                             className="btn btn-primary btn-sm flex-fill rounded-3"
                                    onClick={() => navigate(`/edit-bike/${bike.id}`)}
                             >
                                ✏ Edit
                             </button>

                            <button
                                className="btn btn-outline-danger btn-sm flex-fill rounded-3"
                                onClick={handleDelete}
                            >
                                🗑 Delete
                            </button>
                        </>
)}

                    </div>

                    {/* Wishlist */}
                    <button
                        className={`btn ${
                            isWishlisted
                                ? "btn-danger"
                                : "btn-outline-danger"
                        } w-100 rounded-3 mb-2`}
                        onClick={handleWishlist}
                        disabled={wishlistLoading}
                    >
                        {wishlistLoading
                            ? "Please wait..."
                            : isWishlisted
                                ? "♥ Remove from Wishlist"
                                : "♡ Add to Wishlist"}
                    </button>

                    {/* Add to Cart */}
                    <button
                        className="btn btn-warning w-100 rounded-3 fw-semibold mb-2"
                        onClick={handleAddToCart}
                    >
                        🛒 Add to Cart
                    </button>

                    {/* Buy Now */}
                    <button
                        className="btn btn-success w-100 rounded-3 fw-bold"
                        onClick={handleBuyNow}
                        disabled={buyLoading}
                    >
                        {buyLoading
                            ? "Processing..."
                            : "⚡ Buy Now"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BikeCard;