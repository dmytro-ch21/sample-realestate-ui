import { Link } from 'react-router';
import { CiShoppingTag } from "react-icons/ci";


function PropertyCard({ property }) {
  console.log('Rendering a property card');

  const formatPriceUS = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link to={`/listings/${property.id}`} className="text-decoration-none">
      <div className="card">
        {console.log(property.images[0].image_url)}
        <img
          src={property.images[0].image_url}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          {/* Price */}
          <h5 className="card-title fw-bold mb-1">{formatPriceUS}</h5>
          {/* Details */}
          <div className="d-flex gap-2 text-dark mb-2">
            <span>{property.bedrooms} beds</span>
            <span className="text-muted">|</span>
            <span>{property.bathrooms} baths</span>
            <span className="text-muted">|</span>
            <span>{property.area_sqft} sqft</span>
          </div>

          {/* Title, Address, Type */}
          <p className="card-text mb-1 fw-bold text-truncate">
            {property.title}
          </p>
          <p className="card-text small text-muted mb-2 text-truncate">
            {`${property.address}, ${property.city}, ${property.state}, ${property.zip_code}`}
          </p>

          <div className="d-flex align-items-center small text-muted">
            <span className="text-capitalize"><CiShoppingTag/> {property.property_type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
