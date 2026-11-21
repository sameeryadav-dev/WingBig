import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        try {

            setLoading(true);

            const loggedInUser = await login(email, password);

            alert(`Welcome ${loggedInUser.name}!`);

            navigate(redirectTo, { replace: true });

        } catch (err) {

            setError(err.message || "Invalid email or password");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}>

            <div className="card shadow-lg border-0 rounded-4 p-4"
                style={{ width: "100%", maxWidth: "420px" }}>

                <h2 className="text-center fw-bold mb-2">
                    Welcome Back
                </h2>

                <p className="text-center text-muted mb-4">
                    Login to WingBig Bike Showroom
                </p>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark w-100 rounded-3 fw-semibold"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-4 mb-0">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;