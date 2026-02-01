import { useQuery } from '@tanstack/react-query';
import { getUserGroupsApi } from '../api/groups/groups-services';
import { UserGroupListPayload } from '../api/groups/groups.types';
import { friendsListApi } from '../api/friends/friends-services';

export function useFriendList(userId:number) {
  const query = useQuery({
    queryKey: ['userFriendList', userId, ],
    queryFn: () => friendsListApi(userId),
    staleTime:50000,

    // keepPreviousData: true, // optional, keeps old data while refetching
  });

  return query;
}
