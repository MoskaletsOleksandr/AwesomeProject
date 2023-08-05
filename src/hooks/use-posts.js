import { useSelector } from 'react-redux';

export function usePosts() {
  const { allPosts } = useSelector((state) => state.posts);

  const sortedPosts = [...allPosts].sort((a, b) => b.createdAt - a.createdAt);

  return {
    allPosts: sortedPosts,
  };
}
