const API = "http://localhost:8080/api/cart";

// Every request sends the session cookie so the backend knows who is logged in
const request = (url, method = "GET") =>
    fetch(url, { method, credentials: "include" });

// Handle API Response
async function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Please login to continue");
        }

        const message = await response.text();
        throw new Error(message || `HTTP Error: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// GET CART
export const getCart = async () => handleResponse(await request(API));

// ADD TO CART
export const addToCart = async (bikeId) =>
    handleResponse(await request(`${API}/${bikeId}`, "POST"));

// UPDATE QUANTITY
export const updateCartQuantity = async (bikeId, quantity) =>
    handleResponse(await request(`${API}/${bikeId}/${quantity}`, "PUT"));

// REMOVE FROM CART
export const removeFromCart = async (bikeId) =>
    handleResponse(await request(`${API}/${bikeId}`, "DELETE"));

// CLEAR CART
export const clearCart = async () => {
    const response = await request(API, "DELETE");

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Please login to continue");
        }
        throw new Error(await response.text());
    }

    return response.text();
};
