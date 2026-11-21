import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { placeOrder } from "../services/OrderServices";

function Cart() {

    const {
        cartItems,
        cartCount,
        totalAmount,
        changeQuantity,
        deleteCartItem,
        emptyCart,
        fetchCart
    } = useCart();

    const { fetchWishlistCount } = useWishlist();
    const navigate = useNavigate();
    const [ordering, setOrdering] = useState(false);

    // Order everything in the cart
    const handlePlaceOrder = async () => {
        try {
            setOrdering(true);

            await placeOrder();

            // Ordered bikes are removed from the cart and the wishlist
            await fetchCart();
            await fetchWishlistCount();

            alert("Order placed successfully!");
            navigate("/orders");

        } catch (error) {
            alert(error.message);
        } finally {
            setOrdering(false);
        }
    };

    const handleQuantity = async (bikeId, quantity) => {
        try {
            if (quantity < 1) return;

            await changeQuantity(bikeId, quantity);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleRemove = async (bikeId) => {
        try {
            await deleteCartItem(bikeId);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleClearCart = async () => {
        try {
            await emptyCart();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mt-4">

            <h2 className="mb-4">🛒 My Shopping Cart</h2>

            {cartItems.length === 0 ? (

                <div className="alert alert-info">
                    Your cart is empty!
                </div>

            ) : (

                <>
                    {cartItems.map((item) => (

                        <div className="card mb-3 shadow-sm" key={item.bikeId}>

                            <div className="row g-0 align-items-center">

                                <div className="col-md-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded-start"
                                        style={{
                                            height: "160px",
                                            width: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <div className="card-body">

                                        <h5>{item.name}</h5>
                                        <p>Brand: {item.brand}</p>
                                        <p>Price: ₹{item.price}</p>
                                        <p>Subtotal: ₹{item.subtotal}</p>

                                        <div className="d-flex align-items-center">

                                            <button
                                                className="btn btn-outline-dark"
                                                disabled={item.quantity <= 1}
                                                onClick={() =>
                                                    handleQuantity(
                                                        item.bikeId,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span className="mx-3">
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="btn btn-outline-dark"
                                                onClick={() =>
                                                    handleQuantity(
                                                        item.bikeId,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-3 text-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemove(item.bikeId)}
                                    >
                                        Remove
                                    </button>
                                </div>

                            </div>

                        </div>

                    ))}

                    <div className="card p-4 shadow-sm">

                        <h5>Total Items: {cartCount}</h5>

                        <h3 className="text-success">
                            Total Amount: ₹{totalAmount}
                        </h3>

                        <button
                            className="btn btn-success mt-3"
                            onClick={handlePlaceOrder}
                            disabled={ordering}
                        >
                            {ordering ? "Processing..." : "⚡ Place Order"}
                        </button>

                        <button
                            className="btn btn-danger mt-3"
                            onClick={handleClearCart}
                            disabled={ordering}
                        >
                            Clear Cart
                        </button>

                    </div>

                </>

            )}

        </div>
    );
}

export default Cart;