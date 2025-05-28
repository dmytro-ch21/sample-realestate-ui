import { useGlobalStore } from "../../hooks/useGlobalStore.js";
import SearchBar from "../../components/Search.jsx";
import PropertyCard from "../../components/PropertyCard.jsx";

function Home() {
  const { store } = useGlobalStore();

  return (
    <div className="container py-4">
      <h2 className="mb-3 fw-bold">Home Page</h2>

      {/* Minimal Search Bar */}
      <SearchBar />

      {/* Property Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {store.listings.map((property) => (
          <div key={property.id} className="col mb-4">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
