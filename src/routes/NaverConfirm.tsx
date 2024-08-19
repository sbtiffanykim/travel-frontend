import { Box, Heading, Spinner, Text, ToastId, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { naverLogin } from '../api';

export default function NaverConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = useRef<ToastId>();

  const mutation = useMutation({
    mutationFn: naverLogin,
    onMutate: () => {
      toastId.current = toast({
        title: 'Processing',
        status: 'loading',
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: 'Welcome',
          description: 'You are successfully logged in!',
          status: 'success',
        });
      }
      queryClient.refetchQueries({ queryKey: ['currentUser'] });
      navigate('/');
    },
    onError: () => {},
  });

  const confirmLogin = () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    const state = params.get('state');
    if (code && state) {
      mutation.mutate({ code, state });
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <VStack justifyContent={'center'} mt={100} spacing={3}>
      <Heading>Authenticating with Naver...</Heading>
      <Text>Please wait while we securely connect you to Naver</Text>
      <Box>
        <Spinner mt={5} size={'lg'}></Spinner>
      </Box>
    </VStack>
  );
}
