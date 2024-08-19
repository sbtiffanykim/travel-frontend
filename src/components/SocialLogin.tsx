import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function SocialLogin() {
  const kakaoParams = {
    client_id: '9a0bbc413ab23e67a6eee75ed311ee44',
    redirect_uri: 'http://127.0.0.1:5173/social/kakao',
    response_type: 'code',
  };

  const params = new URLSearchParams(kakaoParams).toString();

  const naverP = {
    client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
    redirect_uri: 'http://127.0.0.1:5173/social/naver',
    state: encodeURIComponent('naverLogin'),
    response_type: 'code',
  };

  const naverParams = new URLSearchParams(naverP).toString();

  return (
    <Box mb={4}>
      <HStack my={6}>
        <Divider />
        <Text color='gray.600' fontSize='xs'>
          or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          w='100%'
          textColor='gray.900'
          fontSize='sm'
          leftIcon={<FaGoogle />}
          variant='outline'
          bgColor={'white'}
          border='1px'
          borderColor='gray.600'
        >
          Continue with Google
        </Button>
        <Button
          as='a'
          href={`https://nid.naver.com/oauth2.0/authorize?${naverParams}`}
          w='100%'
          textColor='gray.900'
          fontSize='sm'
          leftIcon={<SiNaver />}
          variant='outline'
          bgColor={'white'}
          border='1px'
          borderColor='gray.600'
        >
          Continue with Naver
        </Button>
        <Button
          as='a'
          href='https://github.com/login/oauth/authorize?client_id=Ov23liePOECZVmGgKmIN&scope=read:user,user:email'
          w='100%'
          textColor='gray.900'
          fontSize='sm'
          leftIcon={<FaGithub />}
          variant='outline'
          bgColor={'white'}
          border={'1px solid'}
          borderColor='gray.600'
        >
          Continue with Github
        </Button>

        <Button
          as='a'
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w='100%'
          textColor='gray.900'
          fontSize='sm'
          leftIcon={<RiKakaoTalkFill />}
          variant='outline'
          bgColor={'white'}
          border='1px'
          borderColor='gray.600'
        >
          Continue with KakaoTalk
        </Button>
      </VStack>
    </Box>
  );
}
