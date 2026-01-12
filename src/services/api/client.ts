// src/services/api/client.ts
import axios from "axios";

const STRAPI_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:1337"
    : process.env.NEXT_PUBLIC_STRAPI_URL;
const API_TOKEN =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_TOKEN
    : process.env.NEXT_PUBLIC_PROD_API_TOKEN;

const apiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    // Use API token for authentication if available
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error?.message || "Something went wrong";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export { apiClient, STRAPI_URL, API_TOKEN };
