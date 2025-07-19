import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import NavButton from "../components/NavButton.jsx";
import { isTokenValid } from "../utils/auth.js";
import { useEffect } from "react";
import { useGlobalStore } from "../hooks/useGlobalStore.js";

function RootLayout() {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalStore();
  useEffect(() => {}, [store.auth]);

  const handleLogOut = () => {
    console.log("Logging out...");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar>
        {!isTokenValid() ? (
          <>
            <NavButton to="/home" text="Listings" />
            <NavButton to="/signup" text="Sign Up" />
          </>
        ) : (
          <>
            <NavButton to="/home" text="Listings" />
            <NavButton to="/wishlist" text="Wishlist" />
            <NavButton to="/profile" text="Profile" />
            <NavButton to="/ai-search" text="AI Search" />
            {/* <NavButton to="/signup" text="Sign Up" /> */}
            <button
              className="btn btn-sm btn-primary ms-3"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </>
        )}
      </Navbar>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
