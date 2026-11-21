function Filters({ filter, setFilters, bikes }) {

    const handleChange = (event) => {
        setFilters({
            ...filter,
            [event.target.name]: event.target.value
        });
    };

    const resetFilters = () => {
        setFilters({
            brand: "All",
            engine: "All",
            type: "All"
        });
    };

    // Get unique values from available bikes
    const brands = [...new Set(bikes.map(bike => bike.brand).filter(Boolean))].sort();

    const engines = [...new Set(bikes.map(bike => String(bike.engine)).filter(Boolean))]
        .sort((a, b) => Number(a) - Number(b));

    const types = [...new Set(bikes.map(bike => bike.type).filter(Boolean))].sort();

    return (
        <div className="container my-4">
            <div className="row g-3">

                {/* Brand Filter */}
                <div className="col-md-4">
                    <label className="form-label">Brand</label>

                    <select
                        name="brand"
                        className="form-select"
                        value={filter.brand}
                        onChange={handleChange}
                    >
                        <option value="All">All Brands</option>

                        {brands.map(brand => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Engine Filter */}
                <div className="col-md-4">
                    <label className="form-label">Engine</label>

                    <select
                        name="engine"
                        className="form-select"
                        value={filter.engine}
                        onChange={handleChange}
                    >
                        <option value="All">All Engines</option>

                        {engines.map(engine => (
                            <option key={engine} value={engine}>
                                {engine} CC
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type Filter */}
                <div className="col-md-4">
                    <label className="form-label">Type</label>

                    <select
                        name="type"
                        className="form-select"
                        value={filter.type}
                        onChange={handleChange}
                    >
                        <option value="All">All Types</option>

                        {types.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-center mt-3">
                    <button
                        className="btn btn-dark"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Filters;