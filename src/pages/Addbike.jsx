import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBike } from "../services/BikeServices";

function AddBike() {

    const navigate = useNavigate();

    const [bike, setBike] = useState({
        name: "",
        brand: "",
        type: "",
        engine: "",
        price: "",
        mileage: "",
        image: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        setBike({
            ...bike,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const bikeData = {
                ...bike,
                engine: Number(bike.engine),
                price: Number(bike.price),
                mileage: Number(bike.mileage)
            };

            await addBike(bikeData);

            alert("Bike added successfully!");

            navigate("/");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Add New Bike
            </h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Bike Name"
                    value={bike.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="brand"
                    className="form-control mb-3"
                    placeholder="Brand"
                    value={bike.brand}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="type"
                    className="form-control mb-3"
                    placeholder="Type"
                    value={bike.type}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="engine"
                    className="form-control mb-3"
                    placeholder="Engine CC"
                    value={bike.engine}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <input
                    type="number"
                    name="price"
                    className="form-control mb-3"
                    placeholder="Price"
                    value={bike.price}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    required
                />

                <input
                    type="number"
                    name="mileage"
                    className="form-control mb-3"
                    placeholder="Mileage"
                    value={bike.mileage}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    required
                />

                <input
                    type="text"
                    name="image"
                    className="form-control mb-3"
                    placeholder="Image URL"
                    value={bike.image}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Bike"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>

            </form>

        </div>

    );

}

export default AddBike;