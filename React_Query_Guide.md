# React Query + Strapi API Structure Guide

A comprehensive guide for setting up a scalable, reusable React Query structure with Strapi CMS in Next.js with TypeScript.

---

## 📁 Folder Structure

```
src/
├── services/
│   ├── api/
│   │   ├── client.ts          # Axios instance configuration
│   │   ├── endpoints.ts       # API endpoint constants
│   │   └── queryBuilder.ts    # Dynamic Strapi query builder
│   ├── queries/
│   │   ├── useHomePage.ts     # Home page queries
│   │   ├── useCampaigns.ts    # Campaign queries
│   │   ├── useNews.ts         # News queries
│   │   └── index.ts           # Export all queries
│   ├── mutations/
│   │   ├── useCreateDonation.ts
│   │   ├── useUpdateProfile.ts
│   │   └── index.ts           # Export all mutations
│   └── index.ts               # Main export file
├── config/
│   └── reactQuery.ts          # React Query configuration
├── utils/
│   └── strapiHelpers.ts       # Strapi-specific helpers
└── types/
    └── strapi.ts              # Strapi TypeScript types
```

---

## 🔧 Core Files Setup

### 1. API Client (`src/services/api/client.ts`)

**Purpose:** Creates a configured Axios instance with interceptors for auth and error handling.

```typescript
// src/services/api/client.ts
import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const apiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || 'Something went wrong';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export { apiClient, STRAPI_URL };
```

**Key Features:**
- Automatic token injection
- Global error handling
- Returns `response.data` directly (no need for `.data.data`)

---

### 2. Query Builder (`src/services/api/queryBuilder.ts`)

**Purpose:** Dynamically generates Strapi query strings from config objects.

```typescript
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
export const buildStrapiQuery = (populateConfig: Record<string, any>): string => {
  const buildNestedPopulate = (obj: Record<string, any>, prefix = ''): string => {
    const params: string[] = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const currentPrefix = prefix ? `${prefix}[${key}]` : key;
      
      if (typeof value === 'object' && value !== null && value !== '*') {
        // Nested populate
        const nested = buildNestedPopulate(value, '');
        params.push(`populate[${currentPrefix}][populate]${nested}`);
      } else {
        // Simple populate
        params.push(`populate[${currentPrefix}][populate]=${value === '*' ? '*' : ''}`);
      }
    }
    
    return params.join('&');
  };
  
  return buildNestedPopulate(populateConfig);
};

interface StrapiQueryOptions {
  populate?: Record<string, any>;
  filters?: Record<string, any>;
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
          return Object.entries(value)
            .map(([op, val]) => `filters[${key}]${op}=${encodeURIComponent(String(val))}`)
            .join('&');
        }
        return `filters[${key}]=$eq=${encodeURIComponent(String(value))}`;
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
```

**Key Functions:**
- `buildStrapiQuery()` - Converts nested objects to Strapi populate syntax
- `createStrapiQuery()` - Combines populate, filters, pagination, sort, fields
- `POPULATE_PRESETS` - Common populate patterns

---

### 3. React Query Configuration (`src/config/reactQuery.ts`)

**Purpose:** Centralized React Query setup and query key management.

```typescript
// src/config/reactQuery.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: true,
    },
  },
});

/**
 * Query Keys Factory - Centralized key management
 * Use this to ensure consistent query keys across the app
 */
export const queryKeys = {
  homePage: {
    all: ['homePage'] as const,
    detail: (id: string | number) => [...queryKeys.homePage.all, id] as const,
  },
  campaigns: {
    all: ['campaigns'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.campaigns.all, 'list', filters] as const,
    detail: (id: string | number) => [...queryKeys.campaigns.all, 'detail', id] as const,
  },
  news: {
    all: ['news'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.news.all, 'list', filters] as const,
    detail: (slug: string) => [...queryKeys.news.all, 'detail', slug] as const,
  },
  testimonials: {
    all: ['testimonials'] as const,
    list: () => [...queryKeys.testimonials.all, 'list'] as const,
  },
  faqs: {
    all: ['faqs'] as const,
    list: () => [...queryKeys.faqs.all, 'list'] as const,
  },
} as const;
```

**Key Features:**
- Centralized query key management
- TypeScript const assertions for type safety
- Hierarchical key structure

---

### 4. Strapi Helpers (`src/utils/strapiHelpers.ts`)

**Purpose:** Transform Strapi responses and handle media URLs.

```typescript
// src/utils/strapiHelpers.ts
import { STRAPI_URL } from '../services/api/client';

interface StrapiData<T = any> {
  id: number;
  attributes: T;
}

interface StrapiResponse<T = any> {
  data: StrapiData<T> | StrapiData<T>[];
  meta?: any;
}

/**
 * Transforms Strapi response to clean data structure
 * @param response - Strapi API response
 * @returns Cleaned data
 */
export const transformStrapiResponse = <T = any>(
  response: StrapiResponse<T> | null
): T | T[] | null => {
  if (!response) return null;
  
  // Handle array of items
  if (response.data && Array.isArray(response.data)) {
    return response.data.map(item => ({
      id: item.id,
      ...item.attributes,
      ...transformAttributes(item.attributes)
    })) as T[];
  }
  
  // Handle single item
  if (response.data && 'attributes' in response.data) {
    return {
      id: response.data.id,
      ...response.data.attributes,
      ...transformAttributes(response.data.attributes)
    } as T;
  }
  
  return response as any;
};

/**
 * Recursively transforms nested attributes
 */
const transformAttributes = (attributes: Record<string, any>): Record<string, any> => {
  const transformed: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(attributes)) {
    // Handle nested relations
    if (value?.data) {
      if (Array.isArray(value.data)) {
        transformed[key] = value.data.map((item: StrapiData) => ({
          id: item.id,
          ...item.attributes,
          ...transformAttributes(item.attributes || {})
        }));
      } else {
        transformed[key] = {
          id: value.data.id,
          ...value.data.attributes,
          ...transformAttributes(value.data.attributes || {})
        };
      }
    }
  }
  
  return transformed;
};

/**
 * Gets full media URL from Strapi media object
 * @param media - Strapi media object
 * @returns Full URL or null
 */
export const getMediaUrl = (media: any): string | null => {
  if (!media) return null;
  
  const url = media.url || media.data?.attributes?.url;
  if (!url) return null;
  
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

/**
 * Gets multiple media URLs
 * @param mediaArray - Array of Strapi media objects
 * @returns Array of full URLs
 */
export const getMediaUrls = (mediaArray: any[]): string[] => {
  if (!Array.isArray(mediaArray)) return [];
  return mediaArray.map(getMediaUrl).filter(Boolean) as string[];
};

/**
 * Formats Strapi date
 * @param dateString - Strapi date string
 * @returns Formatted date
 */
export const formatStrapiDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

**Key Functions:**
- `transformStrapiResponse()` - Flattens Strapi's nested structure
- `getMediaUrl()` - Converts relative URLs to absolute
- `formatStrapiDate()` - Formats dates consistently

---

## 📝 Creating Query Hooks

### Example: Home Page Query

```typescript
// src/services/queries/useHomePage.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { createStrapiQuery } from '../api/queryBuilder';
import { queryKeys } from '../../config/reactQuery';
import { transformStrapiResponse } from '../../utils/strapiHelpers';

// Define the populate structure for home page
const HOME_PAGE_POPULATE = {
  heroSection: {
    images: '*'
  },
  campaignSection: '*',
  impactCards: '*',
  impactSection: '*',
  impactStatsSection: '*',
  newsSection: '*',
  testimonials: '*',
  FAQSection: '*',
  socialMediaSection: '*'
};

/**
 * Fetches home page data from Strapi
 */
const fetchHomePage = async () => {
  const queryString = createStrapiQuery({
    populate: HOME_PAGE_POPULATE
  });
  
  const response = await apiClient.get(`/home-pages?${queryString}`);
  return transformStrapiResponse(response);
};

/**
 * React Query hook for home page data
 * @param options - React Query options
 * @returns Query result with data, isLoading, error, etc.
 */
export const useHomePage = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: queryKeys.homePage.all,
    queryFn: fetchHomePage,
    staleTime: 10 * 60 * 1000, // 10 minutes - home page changes infrequently
    ...options,
  });
};

/**
 * Hook for specific home page by ID
 */
export const useHomePageById = (
  id: string | number,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.homePage.detail(id),
    queryFn: async () => {
      const queryString = createStrapiQuery({
        populate: HOME_PAGE_POPULATE
      });
      const response = await apiClient.get(`/home-pages/${id}?${queryString}`);
      return transformStrapiResponse(response);
    },
    enabled: !!id,
    ...options,
  });
};
```

---

### Example: Campaigns Query with Filters

```typescript
// src/services/queries/useCampaigns.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { createStrapiQuery } from '../api/queryBuilder';
import { queryKeys } from '../../config/reactQuery';
import { transformStrapiResponse } from '../../utils/strapiHelpers';

const CAMPAIGNS_POPULATE = {
  image: '*',
  category: '*',
  impactStats: '*'
};

/**
 * Fetches all campaigns with filters
 */
const fetchCampaigns = async (
  filters: Record<string, any> = {},
  pagination: { page?: number; pageSize?: number } = {}
) => {
  const queryString = createStrapiQuery({
    populate: CAMPAIGNS_POPULATE,
    filters,
    pagination,
    sort: ['createdAt:desc']
  });
  
  const response = await apiClient.get(`/campaigns?${queryString}`);
  return transformStrapiResponse(response);
};

/**
 * React Query hook for campaigns list
 */
export const useCampaigns = (
  filters: Record<string, any> = {},
  pagination: { page?: number; pageSize?: number } = {},
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.campaigns.list({ filters, pagination }),
    queryFn: () => fetchCampaigns(filters, pagination),
    ...options,
  });
};

/**
 * Hook for single campaign by ID
 */
export const useCampaignById = (
  id: string | number,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.campaigns.detail(id),
    queryFn: async () => {
      const queryString = createStrapiQuery({
        populate: CAMPAIGNS_POPULATE
      });
      const response = await apiClient.get(`/campaigns/${id}?${queryString}`);
      return transformStrapiResponse(response);
    },
    enabled: !!id,
    ...options,
  });
};

/**
 * Hook for featured campaigns
 */
export const useFeaturedCampaigns = (
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useCampaigns(
    { featured: true },
    { pageSize: 3 },
    options
  );
};
```

---

## 🔄 Creating Mutation Hooks

### Example: Create Donation Mutation

```typescript
// src/services/mutations/useCreateDonation.ts
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { queryKeys } from '../../config/reactQuery';

interface DonationData {
  campaign: number;
  amount: number;
  donor: string;
  email?: string;
}

/**
 * Creates a new donation
 */
const createDonation = async (donationData: DonationData) => {
  const response = await apiClient.post('/donations', {
    data: donationData
  });
  return response;
};

/**
 * React Query mutation hook for creating donations
 */
export const useCreateDonation = (
  options?: Omit<UseMutationOptions<any, Error, DonationData>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDonation,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.campaigns.all });
      
      console.log('Donation created successfully!');
      
      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Failed to create donation:', error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};
```

### Example: Update Mutation

```typescript
// src/services/mutations/useUpdateDonation.ts
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../api/client';

interface UpdateDonationParams {
  id: string | number;
  data: Partial<DonationData>;
}

export const useUpdateDonation = (
  options?: Omit<UseMutationOptions<any, Error, UpdateDonationParams>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: UpdateDonationParams) => {
      const response = await apiClient.put(`/donations/${id}`, { data });
      return response;
    },
    onSuccess: (data, { id }, context) => {
      // Optimistically update cache
      queryClient.setQueryData(['donation', id], data);
      
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      
      options?.onSuccess?.(data, { id, data: {} }, context);
    },
    ...options,
  });
};
```

---

## 📦 Export Files

### Queries Index

```typescript
// src/services/queries/index.ts
export * from './useHomePage';
export * from './useCampaigns';
export * from './useNews';
export * from './useTestimonials';
export * from './useFAQs';
```

### Mutations Index

```typescript
// src/services/mutations/index.ts
export * from './useCreateDonation';
export * from './useUpdateDonation';
export * from './useUpdateProfile';
```

### Main Services Export

```typescript
// src/services/index.ts
export * from './queries';
export * from './mutations';
export { apiClient, STRAPI_URL } from './api/client';
export { createStrapiQuery, buildStrapiQuery, POPULATE_PRESETS } from './api/queryBuilder';
export * from '../utils/strapiHelpers';
```

---

## 🎯 Usage in Components

### Basic Query Usage

```typescript
// app/page.tsx
'use client';

import { useHomePage } from '@/services/queries';
import { getMediaUrl } from '@/services';

export default function HomePage() {
  const { data: homePage, isLoading, error } = useHomePage();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const hero = homePage?.[0]?.heroSection;
  
  return (
    <div>
      <h1 className="type-h1">{hero?.title}</h1>
      {hero?.images && (
        <img src={getMediaUrl(hero.images[0])} alt={hero.title} />
      )}
    </div>
  );
}
```

### Query with Filters

```typescript
// app/campaigns/page.tsx
'use client';

import { useCampaigns, useFeaturedCampaigns } from '@/services/queries';
import { useCreateDonation } from '@/services/mutations';

export default function CampaignsPage() {
  const { data: campaigns, isLoading } = useCampaigns(
    { status: 'active' },
    { page: 1, pageSize: 10 }
  );
  
  const { data: featured } = useFeaturedCampaigns();
  
  const createDonationMutation = useCreateDonation({
    onSuccess: () => {
      alert('Donation successful!');
    }
  });
  
  const handleDonate = (campaignId: number, amount: number) => {
    createDonationMutation.mutate({
      campaign: campaignId,
      amount,
      donor: 'user-id'
    });
  };
  
  if (isLoading) return <div>Loading campaigns...</div>;
  
  return (
    <div>
      <h2 className="type-h2">Featured Campaigns</h2>
      {featured?.map((campaign: any) => (
        <div key={campaign.id}>
          <h3 className="type-h3">{campaign.title}</h3>
          <button 
            onClick={() => handleDonate(campaign.id, 50)}
            disabled={createDonationMutation.isPending}
          >
            {createDonationMutation.isPending ? 'Processing...' : 'Donate $50'}
          </button>
        </div>
      ))}
      
      <h2 className="type-h2">All Campaigns</h2>
      {campaigns?.map((campaign: any) => (
        <div key={campaign.id}>{campaign.title}</div>
      ))}
    </div>
  );
}
```

### Next.js App Router Setup

```typescript
// app/providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/config/reactQuery';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

```typescript
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## 🚀 How to Add New Endpoints

### Step 1: Add Query Keys

```typescript
// src/config/reactQuery.ts
export const queryKeys = {
  // ... existing keys
  donors: {
    all: ['donors'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.donors.all, 'list', filters] as const,
    detail: (id: string | number) => [...queryKeys.donors.all, 'detail', id] as const,
  },
};
```

### Step 2: Create Query Hook

```typescript
// src/services/queries/useDonors.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { createStrapiQuery } from '../api/queryBuilder';
import { queryKeys } from '../../config/reactQuery';
import { transformStrapiResponse } from '../../utils/strapiHelpers';

const DONORS_POPULATE = {
  avatar: '*',
  donations: {
    campaign: '*'
  }
};

export const useDonors = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: queryKeys.donors.list(filters),
    queryFn: async () => {
      const query = createStrapiQuery({
        populate: DONORS_POPULATE,
        filters,
        sort: ['createdAt:desc']
      });
      const response = await apiClient.get(`/donors?${query}`);
      return transformStrapiResponse(response);
    }
  });
};

export const useDonorById = (id: string | number) => {
  return useQuery({
    queryKey: queryKeys.donors.detail(id),
    queryFn: async () => {
      const query = createStrapiQuery({
        populate: DONORS_POPULATE
      });
      const response = await apiClient.get(`/donors/${id}?${query}`);
      return transformStrapiResponse(response);
    },
    enabled: !!id
  });
};
```

### Step 3: Export in Index

```typescript
// src/services/queries/index.ts
export * from './useDonors';
```

### Step 4: Use in Components

```typescript
const { data: donors } = useDonors({ verified: true });
```

---

## 🎨 Advanced Patterns

### Infinite Queries (Pagination)

```typescript
// src/services/queries/useInfiniteCampaigns.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { createStrapiQuery } from '../api/queryBuilder';
import { queryKeys } from '../../config/reactQuery';

export const useInfiniteCampaigns = (filters: Record<string, any> = {}) => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.campaigns.all, 'infinite', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const query = createStrapiQuery({
        populate: { image: '*' },
        filters,
        pagination: { page: pageParam, pageSize: 10 }
      });
      const response = await apiClient.get(`/campaigns?${query}`);
      return response;
    },
    getNextPageParam: (lastPage, pages) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
```

### Dependent Queries

```typescript
// Fetch campaign details first, then fetch related donations
const { data: campaign } = useCampaignById(campaignId);

const { data: donations } = useDonations(
  { campaign: campaign?.id },
  {
    enabled: !!campaign?.id, // Only run when campaign is loaded
  }
);
```

### Optimistic Updates

```typescript
export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiClient.put(`/campaigns/${id}`, { data });
    },
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.campaigns.detail(id) });
      
      // Snapshot previous value
      const previousCampaign = queryClient.getQueryData(queryKeys.campaigns.detail(id));
      
      // Optimistically update
      queryClient.setQueryData(queryKeys.campaigns.detail(id), (old: any) => ({
        ...old,
        ...data
      }));
      
      return { previousCampaign };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousCampaign) {
        queryClient.setQueryData(
          queryKeys.campaigns.detail(variables.id),
          context.previousCampaign
        );
      }
    },
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.campaigns.detail(id) });
    },
  });
};
```

---

## 📋 Cheat Sheet

### Common Query Patterns

```typescript
// Basic query
const { data, isLoading, error } = useQuery({
  queryKey: ['key'],
  queryFn: fetchData,
});

// Query with filters
const { data } = useCampaigns({ status: 'active' }, { page: 1, pageSize: 10 });

// Conditional query
const { data } = useQuery({
  queryKey: ['data', id],
  queryFn: () => fetchData(id),
  enabled: !!id, // Only run when id exists
});

// Refetch on interval
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  