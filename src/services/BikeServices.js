const API = "http://localhost:8080/api/bikes";

// GET All Bikes
export const getBikes = async () => {
    const res = await fetch(API);

    if (!res.ok) {
        throw new Error("Failed to fetch bikes");
    }

    return res.json();
};

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

// GET Bike By ID
export async function getBike(id) {
    const res = await fetch(`${API}/${id}`);
    return handleResponse(res);
}

// POST Add Bike
export async function addBike(bike) {
    const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bike)
    });

    return handleResponse(res);
}

// PUT Update Bike
export async function updateBike(id, bike) {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bike)
    });

    return handleResponse(res);
}

// DELETE Bike
export async function deleteBike(id) {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    return handleResponse(res);
}