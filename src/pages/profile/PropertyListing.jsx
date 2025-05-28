import PropertyCard from "../../components/PropertyCard";

function PropertyListing({ properties, onDelete, onAdd }) {
  return (
    <>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0 fw-bold">Listed Properties</h4>
        <button className="btn btn-success" onClick={onAdd}>
          Add Property
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
        {properties.length === 0 && (
          <>
            <div className="col">
              <div className="alert alert-info mt-3">
                No Properties Listed Yet
              </div>
            </div>
          </>
        )}
        {properties.map((property) => (
          <>
            <div className="col" key={property.id}>
              <PropertyCard property={property} />
              <button
                className="btn btn-outline-danger btn-sm w-100 mt-1"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                onClick={() => onDelete(property)}
              >
                Delete
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default PropertyListing;
