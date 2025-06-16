import { Link } from "react-router";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { addToWishlist } from "../api/user";
import { getToken, getDecodedToken, isTokenValid } from "../utils/auth";

function PropertyCard({
  property,
  showWishlistButton = true,
  onWishlistAdded,
}) {
  console.log("Rendering a property card");

  const formatPriceUS = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  // Safe image URL with fallback
  const imageUrl =
    property.images?.[0]?.image_url || "https://via.placeholder.com/400x300";

  const handleAddToWishlist = async () => {
    if (!isTokenValid()) {
      alert("Please log in to add items to wishlist");
      return;
    }

    try {
      const token = getToken();
      const decodedToken = getDecodedToken();
      const userId = parseInt(decodedToken.sub);

      await addToWishlist(token, userId, property.id);

      if (onWishlistAdded) {
        onWishlistAdded();
      }

      alert("Added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add to wishlist. Please try again.");
    }
  };

  return (
    <div>
      <Link to={`/listings/${property.id}`} className="text-decoration-none">
        <div className="card">
          <img
            src={imageUrl}
            className="card-img-top"
            alt={property.title}
            style={{ height: "200px", objectFit: "cover" }}
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
              <span className="text-capitalize">
                <CiShoppingTag /> {property.property_type}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Wishlist Button - Only show on Home/Landing pages */}
      {showWishlistButton && (
        <button
          className="btn btn-outline-primary btn-sm w-100 mt-1"
          onClick={handleAddToWishlist}
        >
          <FaRegHeart className="me-1" />
          Add to Wishlist
        </button>
      )}
    </div>
  );
}

export default PropertyCard;
