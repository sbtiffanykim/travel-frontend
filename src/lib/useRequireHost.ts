import { useEffect } from 'react';
import useUser from './useUser';
import { useNavigate } from 'react-router-dom';

export default function useRequireHost() {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate('/');
      }
    }
  }, [userLoading, navigate]);
  return;
}
