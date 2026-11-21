import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBike } from "../services/BikeServices";
import { useCart } from "../context/CartContext";

import {
    addToWishlist,
    removeFromWishlist
} from "../services/WishlistServices";

import { buyNow } from "../services/OrderServices";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const BikeDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [buyLoading, setBuyLoading] = useState(false);

    const { wishlistBikeIds, fetchWishlistCount } = useWishlist();
        const { fetchCart } = useCart();
    const { isLoggedIn } = useAuth();

    // Wishlist / Buy Now need a logged-in user
    const requireLogin = () => {
        if (isLoggedIn) return true;

        alert("Please login to continue");
        navigate("/login");
        return false;
    };

    const isWishlisted = bike && wishlistBikeIds.includes(bike.id);

    // Fetch Bike
    useEffect(() => {

        const fetchBike = async () => {
            try {
                const data = await getBike(id);
                setBike(data);

            } catch (error) {
                console.error("Error fetching bike:", error);
                setError("Bike not found or failed to load.");

            } finally {
                setLoading(false);
            }
        };

        fetchBike();

    }, [id]);

    // Wishlist
    const handleWishlist = async () => {

        if (!requireLogin()) return;

        try {
            setWishlistLoading(true);

            if (isWishlisted) {
                await removeFromWishlist(bike.id);
                alert("💔 Bike removed from wishlist!");

            } else {
                await addToWishlist(bike.id);
                alert("❤️ Bike added to wishlist!");
            }

            await fetchWishlistCount();

        } catch (error) {
            alert(error.message);

        } finally {
            setWishlistLoading(false);
        }
    };

    // Buy Now
    const handleBuyNow = async () => {

        if (!requireLogin()) return;

        try {
            setBuyLoading(true);

            await buyNow(bike.id);

            // The bike is removed from the cart and the wishlist
            await fetchCart();
            await fetchWishlistCount();

            navigate("/orders");

        } catch (error) {
            alert(error.message);

        } finally {
            setBuyLoading(false);
        }
    };

    if (loading) {
        return <h3 className="text-center mt-5">Loading bike details...</h3>;
    }

    if (error) {
        return <h3 className="text-center text-danger mt-5">{error}</h3>;
    }

    if (!bike) {
        return <h3 className="text-center mt-5">Bike not found.</h3>;
    }

    return (

        <div className="container my-5">

            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">

                <div className="row g-0 align-items-center">

                    {/* Bike Image */}
                    <div className="col-md-6 p-3">

                        <img
                            src={bike.image}
                            alt={bike.name}
                            className="img-fluid rounded-4 w-100"
                            style={{
                                height: "400px",
                                objectFit: "cover"
                            }}
                        />

                    </div>

                    {/* Bike Information */}
                    <div className="col-md-6 p-4">

                        <h2 className="fw-bold mb-3">
                            {bike.name}
                        </h2>

                        <hr />

                        <p className="mb-3">
                            <strong>Brand:</strong> {bike.brand}
                        </p>

                        <p className="mb-3">
                            <strong>Type:</strong> {bike.type}
                        </p>

                        <p className="mb-3">
                            <strong>Engine:</strong> {bike.engine} CC
                        </p>

                        <p className="mb-3">
                            <strong>Mileage:</strong> {bike.mileage} KM/L
                        </p>

                        <h3 className="text-success fw-bold my-4">
                            ₹{Number(bike.price).toLocaleString("en-IN")}
                        </h3>

                        <hr />

                        {/* Action Buttons */}
                        <div className="d-grid gap-3">

                            {/* Buy Now */}
                            <button
                                className="btn btn-success btn-lg rounded-3 fw-bold shadow-sm"
                                onClick={handleBuyNow}
                                disabled={buyLoading}
                            >
                                {buyLoading
                                    ? "Processing..."
                                    : "⚡ Buy Now"}
                            </button>

                            {/* Wishlist */}
                            <button
                                className={`btn ${
                                    isWishlisted
                                        ? "btn-danger"
                                        : "btn-outline-danger"
                                } btn-lg rounded-3`}
                                onClick={handleWishlist}
                                disabled={wishlistLoading}
                            >
                                {wishlistLoading
                                    ? "Please wait..."
                                    : isWishlisted
                                        ? "💔 Remove from Wishlist"
                                        : "❤️ Add to Wishlist"}
                            </button>

                            {/* Back */}
                            <button
                                className="btn btn-dark btn-lg rounded-3"
                                onClick={() => navigate("/")}
                            >
                                ← Back to Bikes
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default BikeDetails;