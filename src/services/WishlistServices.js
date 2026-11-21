const API = "http://localhost:8080/api/wishlist";

const request = (url, method = "GET") =>
    fetch(url, { method, credentials: "include" });

// Handle API response
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

// Get wishlist
export const getWishlist = async () => handleResponse(await request(API));

// Add bike to wishlist
export const addToWishlist = async (bikeId) =>
    handleResponse(await request(`${API}/${bikeId}`, "POST"));

// Remove bike from wishlist
export const removeFromWishlist = async (bikeId) => {
    const response = await request(`${API}/${bikeId}`, "DELETE");

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Please login to continue");
        }

        const message = await response.text();
        throw new Error(message || `HTTP Error: ${response.status}`);
    }

    return response.text();
};
