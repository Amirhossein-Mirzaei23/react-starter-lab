import { useQuery } from '@tanstack/react-query';
import { getUserGroupsApi } from '../features/groups/api/groups-services';
import { UserGroupListPayload } from '../features/groups/api/groups.types';

export function useUserGroupsList(payload: UserGroupListPayload) {
  const query = useQuery({
    queryKey: ['userGroups', payload.userId, payload.page, payload.limit],
    queryFn: () => getUserGroupsApi(payload),
    // keepPreviousData: true, // optional, keeps old data while refetching
  });

  return query;
}
