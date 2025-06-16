const API_BASE = import.meta.env.VITE_BACKEND_HOST;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const jsonHeaders = {
  "Content-Type": "application/json",
  "User-Agent": "client-web",
};

/**
 * POST /listings
 * @param {string} token - Authorization token
 * @param {Object} payload - Property data
 * @return {Promise<Object>} {listing}
 */
export async function createListing(token, payload) {
  const url = `${API_BASE}${API_PREFIX}/listings`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log("Create listing response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}

/**
 * POST /listings/{listingId}/images
 * @param {string} token - Authorization token
 * @param {number} listingId - The listing ID
 * @param {File} imageFile - The image file
 * @param {string} caption - Image caption
 * @return {Promise<Object>} {image}
 */
export async function uploadListingImage(token, listingId, imageFile, caption) {
  const url = `${API_BASE}${API_PREFIX}/listings/${listingId}/images`;
  
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'client-web',
      // Don't set Content-Type for FormData
    },
    body: formData,
  });

  const data = await response.json();

  console.log("Upload listing image response:", data);

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }
  return data;
}