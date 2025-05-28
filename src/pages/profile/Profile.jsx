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

  return (
    <div className="container">
      <h2 className="my-3 fw-bold">Profile</h2>
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
    </div>
  );
}

export default Profile;
