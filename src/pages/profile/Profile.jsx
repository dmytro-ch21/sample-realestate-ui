import { useState } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import PropertyCard from "../../components/PropertyCard";
import ProfileEditForm from "../../components/ProfileEditForm";

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
  // Create a state to show password change form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  // Create state for password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // Create state to store the password message
  const [passwordMessage, setPasswordMessage] = useState("");

  // Create handler to register changes
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  // Create handler to submit form password change
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }
    setPasswordMessage("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setShowPasswordForm(false), 1200);
  };
  // Extract the owned_properties from store
  const [ownedProperties, setOwnedProperties] = useState(store.owned_listings);

  // Delete Modal
  const [propToDelete, setPropToDelete] = useState(null);

  const openDeleteModal = (property) => {
    setPropToDelete(property);
  };

  const confirmDelete = () => {
    setOwnedProperties((prev) => prev.filter((p) => p.id !== propToDelete.id));
  };

  return (
    <div className="container mt-4">
      {editMode ? (
        <ProfileEditForm 
            form={form}
            onChange={handleCHange}
            onSave={handleSave}
            onCancel={() => setEditMode(false)}
        />
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
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? "Cancel Password Change" : "Change Password"}
          </button>
          {showPasswordForm && (
            <form className="mt-3" onSubmit={handlePasswordSubmit}>
              <input
                className="form-control mb-2"
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
              <input
                className="form-control mb-2"
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
              <input
                className="form-control mb-2"
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
              <button className="btn btn-primary" type="submit">
                Change Password
              </button>
              {passwordMessage && <div className="mt-2">{passwordMessage}</div>}
            </form>
          )}
        </>
      )}
      {/* Create Owned Listings Component */}
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0 fw-bold">Listed Properties</h4>
        <button
          className="btn btn-success"
          onClick={() => console.log("Show Add Modal")}
        >
          Add Property
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
        {ownedProperties.length === 0 && (
          <>
            <div className="col">
              <div className="alert alert-info mt-3">
                No Properties Listed Yet
              </div>
            </div>
          </>
        )}
        {ownedProperties.map((property) => (
          <>
            <div className="col" key={property.id}>
              <PropertyCard property={property} />
              <button
                className="btn btn-outline-danger btn-sm w-100 mt-1"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                onClick={() => openDeleteModal(property)}
              >
                Delete
              </button>

              {/* single modal */}
              <div className="modal fade" id="deleteModal" tabIndex={-1}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete listing?</h5>
                      <button className="btn-close" data-bs-dismiss="modal" />
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete
                      <strong> {propToDelete?.title}</strong>?
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        onClick={confirmDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Profile;
