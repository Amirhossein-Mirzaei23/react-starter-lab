import { useQuery } from '@tanstack/react-query';
import { findUserApi } from '../api/friends/friends-services';

export function useFindUser(phone: string) {
  const query = useQuery({
    queryKey: [`findUserResult`, {phone}],
    queryFn: () => findUserApi({phone}),
    // keepPreviousData: true, // optional, keeps old data while refetching
  });

  return query;
}
