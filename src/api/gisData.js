import apiClient from './api'; // Import the main API client

// Example gis-related API functions
export const gisService = {
  // Fetch user by ID
  gisData: () => apiClient.get(`/gisData`),
  // Add more user-related API functions as needed
};

export default gisService;