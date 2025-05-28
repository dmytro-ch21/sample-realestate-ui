import { Outlet } from 'react-router';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import NavButton from '../components/NavButton.jsx';

function RootLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar>
        <NavButton to="/landing" text="Landing"/>
        <NavButton to="/home" text="Listings"/>
        <NavButton to="/wishlist" text="Wishlist"/>
        <NavButton to="/profile" text="Profile"/>
        <NavButton to="/signup" text="Sign Up"/>
      </Navbar>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
