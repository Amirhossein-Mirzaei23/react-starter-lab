import { useQuery } from '@tanstack/react-query';
import { getGroupByIdApi } from '../api/groups/groups-services';

export function useGroupDetail(groupId: number) {
  const query = useQuery({
    queryKey: [`groupsDetail`, groupId],
    queryFn: () => getGroupByIdApi(groupId),
    // keepPreviousData: true, // optional, keeps old data while refetching
  });

  return query;
}
