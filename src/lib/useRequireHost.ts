import { useEffect } from 'react';
import useUser from './useUser';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export default function useRequireHost() {
  const { user, userLoading } = useUser();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate('/');
        toast({
          title: 'Permission Denied',
          description: 'Only hosts can access this page',
          status: 'error',
        });
      }
    }
  }, [userLoading, navigate]);
  return;
}
