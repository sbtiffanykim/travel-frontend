import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from './useUser';

export default function useRequireAuth() {
  const { user, isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate('/');
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return;
}
