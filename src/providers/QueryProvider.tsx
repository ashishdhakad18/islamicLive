// src/providers/QueryProvider.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/config/reactQuery';
import { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * React Query Provider wrapper for Next.js App Router
 * Provides the QueryClient context to all child components
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
     {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
