import { Box, Heading, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../api';
import { useQueryClient } from '@tanstack/react-query';

export default function KakaoConfirm() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const status = await kakaoLogin(code);
      if (status === 200) {
        toast({
          status: 'success',
          title: 'Welcome',
          description: 'You are successfully logged in!',
        });
        queryClient.refetchQueries({ queryKey: ['currentUser'] });
        navigate('/');
      }
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
