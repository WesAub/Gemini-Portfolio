
// This should point to your AWS server's IP or Domain
// When running locally on the same AWS server, it might be 'http://localhost:5000'
export const API_BASE_URL = process.env.API_BASE_URL || '';

export const isBackendConfigured = !!API_BASE_URL;
