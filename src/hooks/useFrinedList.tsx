import { useQuery } from '@tanstack/react-query';
import { getUserGroupsApi } from '../features/groups/api/groups-services';
import { UserGroupListPayload } from '../features/groups/api/groups.types';
import { friendsListApi } from '../features/friends/api/friends-services';

export function useFriendList(userId: number) {
  const query = useQuery({
    queryKey: ['userFriendList', userId],
    queryFn: () => friendsListApi(userId),
    staleTime: 50000,

    // keepPreviousData: true, // optional, keeps old data while refetching
  });

  return query;
}
