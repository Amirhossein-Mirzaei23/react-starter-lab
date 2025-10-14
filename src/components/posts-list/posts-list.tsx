import React from 'react';
import { usePosts } from '../../api/posts/queries';
import { useQueryClient } from '@tanstack/react-query';

export const PostList: React.FC = () => {
  const { data, isLoading, error } = usePosts();
  const queryClient = useQueryClient();

 function refetchQueries(){
  queryClient.invalidateQueries({queryKey:['posts']})
  }


  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error instanceof Error) return <p>خطا: {error.message}</p>;

  return (
    <div className='grid grid-cols-1' >
    <button className='bg-sky-300 rounded-xl p-2'  onClick={refetchQueries} >
      <p className='text-amber-600' >
        Get Data
      </p>
    </button>
        <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
    </div>

  );
};
