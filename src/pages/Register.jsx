import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();
        setError("");

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Registration successful! Please login.");

            navigate("/login");

        } catch (err) {

            setError(err.message);

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
                    Create Account
                </h2>

                <p className="text-center text-muted mb-4">
                    Join WingBig Bike Showroom
                </p>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Full Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark w-100 rounded-3 fw-semibold"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-4 mb-0">
                    Already registered?{" "}
                    <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;