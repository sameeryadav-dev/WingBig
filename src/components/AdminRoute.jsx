import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
    const { isAdmin, isLoggedIn, loading } = useAuth();

    if (loading) {
        return <h4 className="text-center mt-5">Loading...</h4>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;