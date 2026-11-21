import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Only lets logged-in users in. Everyone else is sent to /login and
// brought back to the page they wanted after a successful login.
function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useAuth();
    const location = useLocation();

    // Wait until the backend session check finishes
    if (loading) {
        return <h4 className="text-center mt-5">Loading...</h4>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;
