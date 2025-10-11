import React from 'react';
import { usePosts } from '../../api/posts/queries';

export const PostList: React.FC = () => {
  const { data, isLoading, error } = usePosts();

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error instanceof Error) return <p>خطا: {error.message}</p>;

  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
