import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Login authentication would go here
    navigate("/profile")
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h2 className="mb-4 text-center">Login Page</h2>
        
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card border shadow-sm">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Login</h3>
                
                <form onSubmit={handleSubmit}>
                  {/* Email Address */}
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Password */}
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Login Button */}
                  <div className="d-flex justify-content-center mt-4">
                    <button type="submit" className="btn btn-primary px-4">
                      Login
                    </button>
                  </div>
                  
                  {/* Registration Link */}
                  <div className="text-center mt-3">
                    <p className="mb-0">
                      Don't have an account? <Link to="/register">Register</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;