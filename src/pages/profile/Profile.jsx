import { useState } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";

function Profile() {
  const { store } = useGlobalStore();
  const {
    avatar_url,
    bio,
    city,
    first_name,
    last_name,
    phone_number,
    state,
    zip_code,
    email,
    username,
  } = store.profile_information;

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="container mt-4">
      {editMode ? (
        <>
          <div className="mb-2">
            <label className="form-label">Username</label>
            <input className="form-control" name="username" type="text" />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" />
          </div>
          <div className="mb-2">
            <label className="form-label">First Name</label>
            <input className="form-control" name="first_name" />
          </div>
          <div className="mb-2">
            <label className="form-label">Last Name</label>
            <input className="form-control" name="last_name" />
          </div>
          <div className="mb-2">
            <label className="form-label">Phone Number</label>
            <input className="form-control" name="phone_number" />
          </div>
          <div className="mb-2">
            <label className="form-label">Bio</label>
            <textarea className="form-control" name="bio" />
          </div>
          <div className="mb-2">
            <label className="form-label">City</label>
            <input className="form-control" name="city" />
          </div>
          <div className="mb-2">
            <label className="form-label">State</label>
            <input className="form-control" name="state" />
          </div>
          <div className="mb-2">
            <label className="form-label">Zip Code</label>
            <input className="form-control" name="zip_code" />
          </div>
          <button className="btn btn-success me-2">Save</button>
          <button className="btn btn-secondary me-2">Cancel</button>
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
                  src={avatar_url}
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
                      {first_name} {last_name}
                    </strong>
                  </p>
                  <p className="mb-0 text-muted">{email}</p>
                </div>
              </div>
              <p>
                <strong>Username:</strong> {username}
              </p>
              <p>
                <strong>Phone Number:</strong> {phone_number}
              </p>
              <p>
                <strong>Bio:</strong> {bio}
              </p>
              <p>
                <strong>City:</strong> {city}
              </p>
              <p>
                <strong>State:</strong> {state}
              </p>
              <p>
                <strong>Zip Code:</strong> {zip_code}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
