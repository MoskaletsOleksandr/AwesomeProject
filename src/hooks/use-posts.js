import { useSelector } from 'react-redux';

export function usePosts() {
  const { allPosts } = useSelector((state) => state.posts);

  return {
    allPosts,
  };
}
