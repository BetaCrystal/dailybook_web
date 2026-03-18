import { User } from '@/types/user';
import * as userService from "@/services/user";
import useSWR from 'swr';

export function useUserData() {
  const { data, error, isLoading, mutate } = useSWR<User[]>('/api/me', userService.getUser);

  return {
    user: data,
    isLoading,
    isError: error,
    isPremium: data?.isPremium || false,
    mutate,
  };
}