import { useNavigate, useParams } from "react-router";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapLocationDot,
  FaHouseChimney,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getListingById } from "../../api/listings";
import AIChat from "../../components/AIChat";

function Listing() {
  const { store, dispatch } = useGlobalStore();
  const { id } = useParams();
  const propertyId = parseInt(id);
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await getListingById(propertyId);
        setProperty(propertyData);
      } catch (e) {
        console.error("Error fetching property: ", e);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  // Error state
  if (error) {
    return (
      <div className="container py-4">
        <h2>Error Loading Property</h2>
        <p className="text-danger">{error}</p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // Property not found
  if (!property) {
    return (
      <div className="container py-4">
        <h2>Property Not Found</h2>
        <p>
          The property you're looking for doesn't exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const formatPriceUS = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  // Full address
  const address = `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`;
  const mapQuery = encodeURIComponent(address);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Listing Page</h2>
        <button
          className="btn btn-link p-0 mb-3"
          onClick={() => navigate(-1)}
          style={{ textDecoration: "none" }}
        >
          &larr; Go back
        </button>
      </div>

      <div className="row g-3">
        {/* Image */}
        <div className="col-12">
          <div className="card border">
            <img
              src={property.images[0].image_url}
              className="card-img-top"
              alt="..."
            />
          </div>
        </div>
        {/* First Row - Two Boxes */}
        {/* Price */}
        <div className="col-md-6">
          <div className="card border">
            <div className="card-body py-2">
              <p className="mb-0">Price: {formatPriceUS}</p>
            </div>
          </div>
        </div>
        {/* Specs */}
        <div className="col-md-6">
          <div className="card border">
            <div className="card-body py-2">
              <div className="d-flex justify-content-between">
                <span>
                  <FaBed className="me-1" /> {property.bedrooms}
                </span>
                <span>
                  <FaBath className="me-1" /> {property.bathrooms}
                </span>
                <span>
                  <FaRulerCombined className="me-1" /> {property.area_sqft}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Second Row - Address and contact */}
        <div className="col-md-8">
          <div className="card border">
            <div className="card-body py-2">
              <p className="mb-0">
                <FaMapLocationDot className="me-1" /> {address}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body py-1 text-end d-flex justify-content-between">
              <input type="text" className="border-0 w-75" />
              <button className="btn btn-primary btn-sm">Contact</button>
            </div>
          </div>
        </div>

        {/* Bottom Row - Description */}
        <div className="col-12">
          <div className="card border">
            <div className="card-body py-3">
              <p className="mb-2">
                <FaHouseChimney className="me-1" />
                <span className="text-capitalize">
                  {property.property_type}
                </span>
              </p>
              <h5 className="mb-2">{property.title}</h5>

              <p className="mb-0">{property.description}</p>
            </div>
          </div>
        </div>

        {/* Map Row */}
        <div className="col-12">
          <div className="card border">
            <div className="card-body py-2">
              <h5 className="mb-2">Location</h5>
              <iframe
                title="Property Location"
                width="100%"
                height="300"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <AIChat listingId={id} />
    </div>
  );
}

export default Listing;
