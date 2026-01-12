// src/services/index.ts

// Export homepage query
export { useHomePage } from "./queries";

// Export mutations
export { useCreateDonation } from "./mutations";

// Export API utilities
export { apiClient, STRAPI_URL, API_TOKEN } from "./api/client";
export {
  createStrapiQuery,
  buildStrapiQuery,
  POPULATE_PRESETS,
} from "./api/queryBuilder";
export { ENDPOINTS, withId } from "./api/endpoints";

// Re-export helpers from utils
export {
  transformStrapiResponse,
  getMediaUrl,
  getMediaUrls,
  formatStrapiDate,
  extractPagination,
} from "../utils/strapiHelpers";
