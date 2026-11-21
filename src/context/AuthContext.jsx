import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore login using the backend session
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/users/me",
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    throw new Error("No active session");
                }

                const data = await response.json();

                setUser(data);
                localStorage.setItem("wingbig_user", JSON.stringify(data));

            } catch (error) {
                setUser(null);
                localStorage.removeItem("wingbig_user");
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    // Login
    const login = async (email, password) => {
        const response = await fetch(
            "http://localhost:8080/api/users/login",
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        setUser(data);
        localStorage.setItem("wingbig_user", JSON.stringify(data));

        return data;
    };

    // Logout
    const logout = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/users/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            if (!response.ok) {
                throw new Error("Server logout failed");
            }

        } finally {
            setUser(null);
            localStorage.removeItem("wingbig_user");
        }
    };

    const isAdmin = user?.role === "ADMIN";

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAdmin,
            isLoggedIn: !!user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);