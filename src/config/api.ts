// API Configuration
const API_CONFIG = {
  // Live production URL
  live: "https://travelapi-bg6t.onrender.com",

  // Local development URL
  local: "http://localhost:3001",

  // Current environment - change to 'local' for development  // live
  current: "local",
};

// Export the base URL based on current environment
export const API_BASE_URL = API_CONFIG[API_CONFIG.current];

// Export the API config object for reference
export default API_CONFIG;
