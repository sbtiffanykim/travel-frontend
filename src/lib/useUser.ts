import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api';
import { ICurrentUser } from '../types';

export default function useUser() {
  const { data, isLoading, isError } = useQuery<ICurrentUser>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const isLoggedIn = !isError && !!data; // When there is no error and data exists

  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn,
  };
}
