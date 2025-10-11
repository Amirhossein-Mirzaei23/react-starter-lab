import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './fetch-user';

export function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 2 * 60 * 1000  // 2 min
  });

  if (isLoading) return;
  if (error) return error;

  return data;

}
