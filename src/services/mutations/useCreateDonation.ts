// src/services/mutations/useCreateDonation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';
import { queryKeys } from '../../config/reactQuery';

interface DonationData {
  campaign: number;
  amount: number;
  donor: string;
  email?: string;
  frequency?: 'one-time' | 'monthly' | 'yearly';
  paymentMethod?: string;
}

interface UseCreateDonationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Creates a new donation
 */
const createDonation = async (donationData: DonationData) => {
  const response = await apiClient.post(ENDPOINTS.DONATIONS, {
    data: donationData,
  });
  return response;
};

/**
 * React Query mutation hook for creating donations
 */
export const useCreateDonation = (options?: UseCreateDonationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDonation,
    onSuccess: () => {
      // Invalidate donations query after successful creation
      queryClient.invalidateQueries({ queryKey: queryKeys.donations.all });

      // Call custom onSuccess if provided
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      console.error('Failed to create donation:', error);
      options?.onError?.(error);
    },
  });
};
