import { useQuery } from '@tanstack/react-query';
import { getUserGroupsApi } from '../api/groups/groups-services';
import { UserGroupListPayload } from '../api/groups/groups.types';

export function useUserGroupsList(payload: UserGroupListPayload) {
  const query = useQuery({
    queryKey: ['userGroups', payload.userId, payload.page, payload.limit],
    queryFn: () => getUserGroupsApi(payload),
    // keepPreviousData: true, // optional, keeps old data while refetching
  });

  return query;
}
