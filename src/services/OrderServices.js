const API = "http://localhost:8080/api/orders";

// Get Order History (of the logged-in user)
export const getOrderHistory = async () => {

    const response = await fetch(API, { credentials: "include" });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Please login to continue");
        }
        throw new Error("Failed to fetch order history");
    }

    return response.json();
};

// Buy Now
export const buyNow = async (bikeId) => {

    const response = await fetch(`${API}/buy-now/${bikeId}`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Please login to continue");
        }

        const message = await response.text();
        throw new Error(message || "Failed to place order");
    }

    return response.json();
};

// Place an order for everything in the cart
export const placeOrder = async () => {

    const response = await fetch(API, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Please login to continue");
        }

        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to place order");
    }

    return response.json();
};