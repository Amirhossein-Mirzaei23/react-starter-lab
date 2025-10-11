import { useQuery } from '@tanstack/react-query';
import { getPosts } from './fetch-post';
import type { PostDto } from './posts.types';

export function usePosts() {
  return useQuery<PostDto[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 7 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
    retryDelay: (attemptIndex) =>  attemptIndex * 400,
  });
}







// const { data, isLoading, error } = useQuery({
//   queryKey: ['posts', userId],
//   queryFn: () => getPosts(userId),
//   staleTime: 2 * 60 * 1000,
//   cacheTime: 5 * 60 * 1000,
//   enabled: navigator.onLine,
//   refetchOnWindowFocus: false,
//   refetchOnReconnect: false,
//   retry: 2,
//   retryDelay: 1000,
//   select: (data) => data.map(post => post.title),
//   keepPreviousData: true,
//   placeholderData: [{ id: 0, title: 'loading...' }],
//   onSuccess: (data) => console.log('fetched', data),
//   onError: (err) => console.log('error', err),
//   onSettled: () => console.log('done')
// });
