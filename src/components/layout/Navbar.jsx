const Navbar = ({ children }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand me-5" href="/">
          <span className="text-primary fw-bold fs-4">RE Marketplace</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
