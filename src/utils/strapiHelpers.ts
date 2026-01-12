// src/utils/strapiHelpers.ts
import { STRAPI_URL } from '../services/api/client';

/**
 * Transforms Strapi response to clean data structure
 * Handles both Strapi v4 (nested attributes) and v5 (flat) formats
 * Also handles when axios interceptor already returns response.data
 * 
 * @param response - Strapi API response (can be various formats)
 * @returns Cleaned data (single item or array)
 */
export const transformStrapiResponse = <T = Record<string, unknown>>(
  response: unknown
): T | T[] | null => {
  if (!response) return null;

  // If it's already an array (axios interceptor returned the data array directly)
  if (Array.isArray(response)) {
    // Check if items have 'attributes' (Strapi v4) or are flat (Strapi v5)
    return response.map((item) => {
      if (item && typeof item === 'object') {
        // Strapi v4 format: { id, attributes: {...} }
        if ('attributes' in item && item.attributes) {
          return {
            id: item.id,
            ...item.attributes,
          } as T;
        }
        // Strapi v5 / flat format: { id, heroSection, ... }
        return item as T;
      }
      return item;
    }) as T[];
  }

  // If it's an object with 'data' property (Strapi response wrapper)
  if (typeof response === 'object' && response !== null && 'data' in response) {
    const strapiResponse = response as { data: unknown; meta?: unknown };

    if (strapiResponse.data === null) {
      return null;
    }

    // Recurse to handle the data
    return transformStrapiResponse<T>(strapiResponse.data);
  }

  // If it's a single object (not in array)
  if (typeof response === 'object' && response !== null) {
    const item = response as Record<string, unknown>;
    
    // Strapi v4 format: { id, attributes: {...} }
    if ('attributes' in item && item.attributes) {
      return {
        id: item.id,
        ...(item.attributes as Record<string, unknown>),
      } as T;
    }
    
    // Strapi v5 / flat format
    return item as T;
  }

  return response as T;
};

/**
 * Gets full media URL from Strapi media object
 * Handles various Strapi media formats
 * @param media - Strapi media object
 * @returns Full URL or null
 */
export const getMediaUrl = (
  media: { url?: string; data?: { attributes?: { url?: string } } } | null | undefined
): string | null => {
  if (!media) return null;

  // Direct url property (Strapi v5 or flat format)
  if (typeof media === 'object' && 'url' in media && media.url) {
    return media.url.startsWith('http') ? media.url : `${STRAPI_URL}${media.url}`;
  }

  // Nested data.attributes.url (Strapi v4 format)  
  const nestedUrl = media.data?.attributes?.url;
  if (nestedUrl) {
    return nestedUrl.startsWith('http') ? nestedUrl : `${STRAPI_URL}${nestedUrl}`;
  }

  return null;
};

/**
 * Gets multiple media URLs from an array
 * @param mediaArray - Array of Strapi media objects
 * @returns Array of full URLs
 */
export const getMediaUrls = (
  mediaArray: Array<Record<string, unknown>> | null | undefined
): string[] => {
  if (!Array.isArray(mediaArray)) return [];
  
  return mediaArray
    .map((media) => {
      if (typeof media === 'object' && media !== null && 'url' in media) {
        const url = media.url as string;
        return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
      }
      return null;
    })
    .filter(Boolean) as string[];
};

/**
 * Formats Strapi date
 * @param dateString - Strapi date string
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted date
 */
export const formatStrapiDate = (
  dateString: string | null | undefined,
  locale: string = 'en-US'
): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Extract pagination meta from Strapi response
 */
export const extractPagination = (
  response: { meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } } } | null | undefined
): {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
} | null => {
  return response?.meta?.pagination || null;
};
