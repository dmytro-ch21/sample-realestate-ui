const API_BASE = import.meta.env.VITE_BACKEND_HOST;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const jsonHeaders = {
  "Content-Type": "application/json",
  "User-Agent": "client-web",
};

/**
 * PUT /users/{userId}
 * @param {number} userId - The user ID
 * @param {Object} payload {email, username, password}
 * @return {Promise<Object>} {message, user}
 */
export async function updateUser(token, userId, payload) {
  const url = `${API_BASE}${API_PREFIX}/users/${userId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("Update user response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * PUT /users/{userId}/profile
 * @param {number} userId - The user ID
 * @param {Object} payload {avatar_url, bio, city, first_name, last_name, phone_number, state, zip_code}
 * @return {Promise<Object>} {message, profile}
 */
export async function updateUserProfile(token, userId, payload) {
  console.log("Making updateUserProfile request with headers", jsonHeaders);
  const url = `${API_BASE}${API_PREFIX}/users/${userId}/profile`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { ...jsonHeaders, Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("Update profile response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * Get /users/{userId}
 * @param {number} userId - The user ID
 * @return {Promise<Object>} {user}
 */
export async function getUserById(token, userId) {
  const url = `${API_BASE}${API_PREFIX}/users/${userId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { ...jsonHeaders, Authorization: `Bearer ${token}` }
  });

  const data = await response.json();

  console.log("User response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}