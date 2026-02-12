// Dynamically determine the API URL based on the current hostname
// This allows the app to work on localhost, 127.0.0.1, or any network IP (e.g., 192.168.x.x)
const hostname = window.location.hostname;
const port = 3001; // The port where the backend server is running

// Prefer environment variable (for production/Netlify), otherwise auto-detect (for local dev)
export const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${hostname}:${port}/api`;
