import { useState } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import PropertyCard from "../../components/PropertyCard";
import ProfileEditForm from "./ProfileEditForm";
import ProfileDisplay from "./ProfileDisplay";
import PasswordChange from "./PasswordChange";
import PropertyDeleteModal from "./PropertyDeleteModal";
import PropertyListing from "./PropertyListing";
import PropertyModal from "./PropertyModal";

function Profile() {
  // Add access to global store
  const { store } = useGlobalStore();
  //   Extract the profile info specifically for convinience
  const [profile, setProfile] = useState({ ...store.profile_information });
  // State for edit button
  const [editMode, setEditMode] = useState(false);
  // State for add property modal
  const [showAddModal, setShowAddModal] = useState(false);

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
  const handleSave = () => {
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
          <ProfileDisplay profile={profile} onEdit={() => setEditMode(true)} />
          <PasswordChange
            showForm={showPasswordForm}
            onToggle={() => setShowPasswordForm(!showPasswordForm)}
            passwordForm={passwordForm}
            onChange={handlePasswordChange}
            onSubmit={handlePasswordSubmit}
            message={passwordMessage}
          />
        </>
      )}
      {/* Create Owned Listings Component */}
      <PropertyListing
        properties={ownedProperties}
        onDelete={openDeleteModal}
        onAdd={() => setShowAddModal(true)}
      />

      <PropertyDeleteModal property={propToDelete} onConfirm={confirmDelete} />

      {showAddModal && (
        <PropertyModal
          setShowAddModal={setShowAddModal}
          setProfile={setProfile}
          profile={profile}
        />
      )}
    </div>
  );
}

export default Profile;
