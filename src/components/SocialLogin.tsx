import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function SocialLogin() {
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
