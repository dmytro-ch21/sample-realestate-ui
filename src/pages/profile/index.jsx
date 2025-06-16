import { useEffect, useState } from "react";
import { useGlobalStore } from "../../hooks/useGlobalStore";
import ProfileEditForm from "./ProfileEditForm";
import ProfileDisplay from "./ProfileDisplay";
import PasswordChange from "./PasswordChange";
import PropertyDeleteModal from "./PropertyDeleteModal";
import PropertyListing from "./PropertyListing";
import PropertyModal from "./PropertyModal";
import { getUserById, updateUser, updateUserProfile } from "../../api/user";
import { getDecodedToken, getToken, isTokenValid } from "../../utils/auth";
import { useNavigate } from "react-router";

function Profile() {
  // Add access to global store
  const { store } = useGlobalStore();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // State for form
  const [form, setForm] = useState({
    bio: "",
    city: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    state: "",
    zip_code: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        if (!token || !isTokenValid()) {
          console.log("No valid token found");
          navigate("/login");
          return;
        }
        const decodedToken = getDecodedToken();
        if (decodedToken) {
          const userResponse = await getUserById(
            token,
            parseInt(decodedToken.sub)
          );

          setProfile({
            ...userResponse,
            ...userResponse.profile_information,
          });

          setForm({
            bio: userResponse.profile_information?.bio || "",
            city: userResponse.profile_information?.city || "",
            first_name: userResponse.profile_information?.first_name || "",
            last_name: userResponse.profile_information?.last_name || "",
            phone_number: userResponse.profile_information?.phone_number || "",
            state: userResponse.profile_information?.state || "",
            zip_code: userResponse.profile_information?.zip_code || "",
            email: userResponse.email || "",
            username: userResponse.username || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  // State for edit button
  const [editMode, setEditMode] = useState(false);

  // State for add property modal
  const [showAddModal, setShowAddModal] = useState(false);

  // Create a handler for changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Create handler for save button
  const handleSave = async () => {
    try {
      const token = getToken();
      const userData = {
        email: form.email,
        username: form.username,
      };
      // Prepare profile data
      const profileData = {
        bio: form.bio,
        city: form.city,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
        state: form.state,
        zip_code: form.zip_code,
      };

      await updateUserProfile(store.auth.token, profile.id, profileData);

      const userResponse = await updateUser(
        store.auth.token,
        profile.id,
        userData
      );
      setEditMode(false);
      setProfile({
        ...profile,
        ...userResponse.user,
        ...userResponse.user.profile_information,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
  const [ownedProperties, setOwnedProperties] = useState([]);
  useEffect(() => {
    console.log("Setting Owned Listings", profile?.owned_listings);
    if (profile?.owned_listings) {
      setOwnedProperties(profile.owned_listings);
    }
  }, [profile]); // Add profile as dependency
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
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          {/* Only render ProfileDisplay if profile exists */}
          {profile && (
            <ProfileDisplay
              profile={profile}
              onEdit={() => setEditMode(true)}
            />
          )}
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
