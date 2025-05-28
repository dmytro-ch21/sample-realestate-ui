import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'

const Registration = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation would go here
    console.log('Registration data:', formData);
    // Submit to API would go here
    navigate("/login");
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <h2 className="mb-4 text-center">Registration Page</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Email Address */}
                    <div className="col-md-6">
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

                    {/* Username */}
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="col-12">
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

                    {/* Confirm Password */}
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 d-flex justify-content-center mt-4">
                      <button type="submit" className="btn btn-primary px-4">
                        Register
                      </button>
                    </div>

                    {/* Login Link */}
                    <div className="col-12 text-center mt-3">
                      <p className="mb-0">
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
                    </div>
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

export default Registration;
