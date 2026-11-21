import BikeCard from "./BikeCard";
import SearchBike from "./SearchBike";
import { useEffect, useState } from "react";
import Filters from "./Filter";
import { getBikes, deleteBike } from "../services/BikeServices";

const BikeList = () => {

    const [bikes, setBikes] = useState([]);
    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        brand: "All",
        engine: "All",
        type: "All"
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const bikesPerPage = 6;

    // Fetch bikes from Spring Boot
    useEffect(() => {

        getBikes()
            .then((data) => {
                setBikes(data);
            })
            .catch((error) => {
                console.log("Error fetching bikes:", error);
            });

    }, []);

    // Reset page when searching or filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filters]);

    // Delete bike
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bike?"
        );

        if (!confirmDelete) return;

        try {

            await deleteBike(id);

            setBikes((prevBikes) =>
                prevBikes.filter(
                    (bike) => String(bike.id) !== String(id)
                )
            );

            alert("Bike deleted successfully!");

        } catch (error) {

            console.error("Error deleting bike:", error);
            alert("Failed to delete bike!");

        }
    };

    // Search and filter bikes
    const filteredBikes = bikes.filter((bike) => {

        const bikeName = (bike.name || "").toLowerCase();
        const bikeBrand = (bike.brand || "").toLowerCase();
        const bikeType = (bike.type || "").toLowerCase();

        const searchText = search.toLowerCase();

        const searchMatch =
            bikeName.includes(searchText) ||
            bikeBrand.includes(searchText) ||
            bikeType.includes(searchText);

        const brandMatch =
            filters.brand === "All" ||
            bike.brand === filters.brand;

        const engineMatch =
            filters.engine === "All" ||
            String(bike.engine) === filters.engine;

        const typeMatch =
            filters.type === "All" ||
            bike.type === filters.type;

        return searchMatch && brandMatch && engineMatch && typeMatch;

    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredBikes.length / bikesPerPage);

    const startIndex = (currentPage - 1) * bikesPerPage;

    const currentBikes = filteredBikes.slice(
        startIndex,
        startIndex + bikesPerPage
    );

    return (
        <section className="bike-section" id="bikes">

            <div className="section-heading">
                <p>OUR COLLECTION</p>
                <h2>Popular Bikes</h2>
            </div>

            <SearchBike
                search={search}
                setSearch={setSearch}
            />

            <Filters
                filter={filters}
                setFilters={setFilters}
                bikes={bikes}
            />

            {/* Bike Count */}
            <div className="container mb-3">

                <p className="text-muted">
                    Showing {filteredBikes.length === 0 ? 0 : startIndex + 1}
                    {" - "}
                    {Math.min(startIndex + bikesPerPage, filteredBikes.length)}
                    {" of "}
                    {filteredBikes.length} bikes
                </p>

            </div>

            {/* Bike Cards */}
            <div className="bike-grid">

                {currentBikes.length > 0 ? (

                    currentBikes.map((bike) => (
                        <BikeCard
                            key={bike.id}
                            bike={bike}
                            onDelete={handleDelete}
                        />
                    ))

                ) : (

                    <h4 className="text-center">
                        No bikes found!
                    </h4>

                )}

            </div>

            {/* Pagination */}
            {totalPages > 1 && (

                <div className="d-flex justify-content-center gap-3 my-4">

                    <button
                        className="btn btn-dark"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        Previous
                    </button>

                    <span className="align-self-center">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className="btn btn-dark"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next
                    </button>

                </div>

            )}

        </section>
    );
};

export default BikeList;