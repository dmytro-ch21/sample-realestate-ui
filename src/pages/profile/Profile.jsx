import { useState } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";

function Profile() {
  // Add access to global store
  const { store } = useGlobalStore();
  //   Extract the profile info specifically for convinience

  const [profile, setProfile] = useState({ ...store.profile_information });

  // State for edit button
  const [editMode, setEditMode] = useState(false);
  // State for form
  const [form, setForm] = useState({
    bio: profile.bio,
    city: profile.city,
    first_name: profile.first_name,
    last_name: profile.last_name,
    phone_number: profile.phone_number,
    state: profile.state,
    zip_code: profile.zip_code,
    email: profile.email,
    username: profile.username,
  });
  // Create a handler for changes
  const handleCHange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Create handler for save button
  const handleSave = (e) => {
    setProfile({
      ...profile,
      bio: form.bio,
      city: form.city,
      first_name: form.first_name,
      last_name: form.last_name,
      phone_number: form.phone_number,
      state: form.state,
      zip_code: form.zip_code,
      email: form.email,
      username: form.username,
    });
    setEditMode(false);
  };

  return (
    <div className="container mt-4">
      {editMode ? (
        <>
          <div className="mb-2">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              name="username"
              type="text"
              value={form.username}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              name="first_name"
              value={form.first_name}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              name="last_name"
              value={form.last_name}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Phone Number</label>
            <input
              className="form-control"
              name="phone_number"
              value={form.phone_number}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              name="bio"
              value={form.bio}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">City</label>
            <input
              className="form-control"
              name="city"
              value={form.city}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">State</label>
            <input
              className="form-control"
              name="state"
              value={form.state}
              onChange={handleCHange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Zip Code</label>
            <input
              className="form-control"
              name="zip_code"
              value={form.zip_code}
              onChange={handleCHange}
            />
          </div>
          <button className="btn btn-success me-2" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="my-3 fw-bold">Profile</h2>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
          {/* Button */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    marginRight: 16,
                  }}
                />
                <div>
                  <p className="mb-1">
                    <strong>
                      {profile.first_name} {profile.last_name}
                    </strong>
                  </p>
                  <p className="mb-0 text-muted">{profile.email}</p>
                </div>
              </div>
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Phone Number:</strong> {profile.phone_number}
              </p>
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
              <p>
                <strong>City:</strong> {profile.city}
              </p>
              <p>
                <strong>State:</strong> {profile.state}
              </p>
              <p>
                <strong>Zip Code:</strong> {profile.zip_code}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
