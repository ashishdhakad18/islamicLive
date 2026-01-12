// src/services/api/queryBuilder.ts

/**
 * Creates Strapi query string from a populate configuration object
 * @param populateConfig - Configuration object for populating relations
 * @returns Query string
 *
 * @example
 * const config = {
 *   heroSection: {
 *     images: '*'
 *   },
 *   campaignSection: '*'
 * };
 * buildStrapiQuery(config);
 * // Returns: "populate[heroSection][populate][images][populate]=*&populate[campaignSection][populate]=*"
 */
export const buildStrapiQuery = (populateConfig: Record<string, unknown>): string => {
  const params: string[] = [];

  const processPopulate = (obj: Record<string, unknown>, basePath: string) => {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = basePath ? `${basePath}[populate][${key}]` : `populate[${key}]`;

      if (value === '*') {
        // Simple populate with wildcard
        params.push(`${currentPath}[populate]=*`);
      } else if (typeof value === 'object' && value !== null) {
        // Nested populate - recurse into children
        processPopulate(value as Record<string, unknown>, currentPath);
      } else {
        // Simple populate without specific value
        params.push(`${currentPath}[populate]=*`);
      }
    }
  };

  processPopulate(populateConfig, '');
  return params.join('&');
};

interface StrapiQueryOptions {
  populate?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string[];
  fields?: string[];
}

/**
 * Creates a complete Strapi query string with filters, pagination, and sorting
 * @param options - Query options
 * @returns Complete query string
 */
export const createStrapiQuery = ({
  populate = {},
  filters = {},
  pagination = {},
  sort = [],
  fields = []
}: StrapiQueryOptions = {}): string => {
  const queryParts: string[] = [];

  // Add populate
  if (Object.keys(populate).length > 0) {
    queryParts.push(buildStrapiQuery(populate));
  }

  // Add filters
  if (Object.keys(filters).length > 0) {
    const filterParams = Object.entries(filters)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Handle operators like $eq, $contains, etc.
          return Object.entries(value as Record<string, unknown>)
            .map(([op, val]) => `filters[${key}]${op}=${encodeURIComponent(String(val))}`)
            .join('&');
        }
        return `filters[${key}][$eq]=${encodeURIComponent(String(value))}`;
      })
      .join('&');
    queryParts.push(filterParams);
  }

  // Add pagination
  if (pagination.page) {
    queryParts.push(`pagination[page]=${pagination.page}`);
  }
  if (pagination.pageSize) {
    queryParts.push(`pagination[pageSize]=${pagination.pageSize}`);
  }

  // Add sorting
  if (sort.length > 0) {
    sort.forEach((sortField, index) => {
      queryParts.push(`sort[${index}]=${sortField}`);
    });
  }

  // Add fields
  if (fields.length > 0) {
    fields.forEach((field, index) => {
      queryParts.push(`fields[${index}]=${field}`);
    });
  }

  return queryParts.join('&');
};

/**
 * Shorthand for common populate patterns
 */
export const POPULATE_PRESETS = {
  DEEP: '*',
  MEDIA: {
    fields: ['url', 'alternativeText', 'caption', 'width', 'height']
  },
  AUTHOR: {
    fields: ['name', 'email'],
    avatar: '*'
  }
} as const;
