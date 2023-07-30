import { useSelector } from 'react-redux';

export function useAuth() {
  const { login, email, token, id } = useSelector((state) => state.user);

  return {
    isAuth: !!email,
    login,
    email,
    token,
    id,
  };
}
