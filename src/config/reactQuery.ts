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
  // Homepage - single page with all sections embedded
  homePage: {
    all: ['homePage'] as const,
  },

  // Donations (for mutation invalidation)
  donations: {
    all: ['donations'] as const,
  },
} as const;
