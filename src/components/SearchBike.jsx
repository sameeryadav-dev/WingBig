function SearchBike({ search, setSearch }) {

    return (
        <div className="container my-3">
            <div className="input-group">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search bikes by name, brand or type..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <button
                    className="btn btn-outline-dark"
                    onClick={() => setSearch("")}
                >
                    Clear
                </button>

            </div>
        </div>
    );
}

export default SearchBike;