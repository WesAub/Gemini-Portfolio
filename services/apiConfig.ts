
// On your AWS server, the backend runs on port 5000
// We use a relative path if they are on the same domain, 
// or the public IP if accessing from elsewhere.
export const API_BASE_URL = 'http://localhost:5000';

export const isBackendConfigured = true; // Always true now that we have server.js
