import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

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
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MdLightMode, MdDarkMode);

  return (
    <HStack justifyContent={'space-between'} py={5} px={10} borderBottomWidth={1}>
      <Link to={'/'}>
        <Box color='red.500'>
          <FaAirbnb size='38px' />
        </Box>
      </Link>
      <HStack spacing={2}>
        <IconButton
          aria-label={
            colorMode === 'light' ? 'Change to dark mode' : 'Change to light mode'
          }
          icon={<Icon />}
          onClick={toggleColorMode}
          variant={'ghost'}
        ></IconButton>
        <Button onClick={onLoginOpen}>Log in</Button>
        <LightMode>
          <Button onClick={onSignupOpen} colorScheme='red'>
            Sign up
          </Button>
        </LightMode>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}