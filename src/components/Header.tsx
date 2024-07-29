import { Link } from 'react-router-dom';
import { Box, Button, HStack, useDisclosure } from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  return (
    <HStack justifyContent={'space-between'} py={5} px={10} borderBottomWidth={1}>
      <Link to={'/'}>
        <Box color='red.500'>
          <FaAirbnb size='38px' />
        </Box>
      </Link>
      <HStack spacing={2}>
        <Button onClick={onLoginOpen}>Log in</Button>
        <Button onClick={onSignupOpen} colorScheme='red'>
          Sign up
        </Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
