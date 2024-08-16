import { Box, Heading, Spinner, Text, ToastId, useToast, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function KakaoConfirm() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: kakaoLogin,
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

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      mutation.mutate(code);
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <VStack justifyContent={'center'} mt={100} spacing={3}>
      <Heading>Authenticating with Kakao...</Heading>
      <Text>Please wait while we securely connect you to Kakao</Text>
      <Box>
        <Spinner mt={5} size={'lg'}></Spinner>
      </Box>
    </VStack>
  );
}
