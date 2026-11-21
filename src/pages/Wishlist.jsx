import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { buyNow } from "../services/OrderServices";
import {
    getWishlist,
    removeFromWishlist
} from "../services/WishlistServices";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { fetchWishlistCount } = useWishlist();
    const { fetchCart } = useCart();
    const navigate = useNavigate();

    // Load Wishlist
    const fetchWishlist = async () => {
        try {
            const data = await getWishlist();
            setWishlist(data);
        } catch (error) {
            console.log("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    // Remove Bike
    const handleRemove = async (bikeId) => {
        try {
            await removeFromWishlist(bikeId);

            setWishlist(prev =>
                prev.filter(item => item.bikeId !== bikeId)
            );

            await fetchWishlistCount();

            alert("Bike removed from wishlist!");
        } catch (error) {
            alert(error.message);
        }
    };

    // Buy Now (the bike is removed from the wishlist and the cart)
    const handleBuyNow = async (bikeId) => {
        try {
            await buyNow(bikeId);

            setWishlist(prev =>
                prev.filter(item => item.bikeId !== bikeId)
            );

            await fetchWishlistCount();
            await fetchCart();

            alert("Order placed successfully!");
            navigate("/orders");

        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return <h3 className="text-center mt-5">Loading Wishlist...</h3>;
    }

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                ❤️ My Wishlist
            </h2>

            {wishlist.length === 0 ? (

                <div className="text-center mt-5">

                    <h4>Your Wishlist is Empty!</h4>

                    <p>Add your favourite bikes to see them here.</p>

                    <button
                        className="btn btn-dark"
                        onClick={() => navigate("/")}
                    >
                        Explore Bikes
                    </button>

                </div>

            ) : (

                <div className="row">

                    {wishlist.map(item => (

                        <div className="col-md-4 mb-4" key={item.id}>

                            <div className="card h-100">

                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    alt={item.name}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {item.name}
                                    </h5>

                                    <p>Brand: {item.brand}</p>

                                    <p>Price: ₹{item.price}</p>

                                    <button
                                        className="btn btn-dark btn-sm me-2 mb-2"
                                        onClick={() => navigate(`/bike/${item.bikeId}`)}
                                    >
                                        View Details
                                    </button>

                                    <button
                                        className="btn btn-success btn-sm me-2 mb-2"
                                        onClick={() => handleBuyNow(item.bikeId)}
                                    >
                                        ⚡ Buy Now
                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-sm mb-2"
                                        onClick={() => handleRemove(item.bikeId)}
                                    >
                                        Remove ❤️
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Wishlist;