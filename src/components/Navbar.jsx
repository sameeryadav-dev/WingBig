import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { wishlistCount } = useWishlist();
    const { cartCount } = useCart();
    const { user, logout, isAdmin, isLoggedIn } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
    await logout();
    navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link to="/" className="navbar-brand">
                🏍️ Bike Showroom
            </Link>

            <div>
                <Link to="/" className="btn btn-outline-light me-2">
                    Home
                </Link>

                <Link to="/about" className="btn btn-outline-light me-2">
                    About
                </Link>

                <Link to="/contact" className="btn btn-outline-light me-2">
                    Contact
                </Link>

                {isAdmin && (
                    <Link to="/add-bike" className="btn btn-outline-warning me-2">
                        Add Bike
                    </Link>
                )}

                {isLoggedIn ? (
                    <>
                        <Link to="/wishlist" className="btn btn-outline-light me-2">
                            ❤️ Wishlist ({wishlistCount})
                        </Link>

                        <Link to="/cart" className="btn btn-outline-warning me-2">
                            🛒 Cart ({cartCount})
                        </Link>

                        <Link to="/orders" className="btn btn-outline-light me-2">
                            📦 My Orders
                        </Link>

                        <span className="text-white me-2">
                            Welcome, {user.name}
                        </span>

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-outline-light me-2">
                            Login
                        </Link>

                        <Link to="/register" className="btn btn-success">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;