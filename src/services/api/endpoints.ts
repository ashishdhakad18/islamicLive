// src/services/api/endpoints.ts

/**
 * API Endpoint Constants
 * Centralized endpoint management for easy maintenance
 */
export const ENDPOINTS = {
  // Homepage (single type with all sections)
  HOME_PAGE: '/home-pages',

  // Donations (for form submissions)
  DONATIONS: '/donations',

  // Auth endpoints (for future use)
  AUTH: {
    LOGIN: '/auth/local',
    REGISTER: '/auth/local/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
} as const;

/**
 * Helper to construct endpoint with ID
 */
export const withId = (endpoint: string, id: string | number): string => {
  return `${endpoint}/${id}`;
};
