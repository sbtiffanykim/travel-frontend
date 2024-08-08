import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Tab,
  TabList,
  Tabs,
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

  const location = useLocation();

  const tabIndex =
    location.pathname === '/' || location.pathname.startsWith('/rooms')
      ? 0
      : location.pathname.startsWith('/experiences')
      ? 1
      : 0;

  const { colorMode, toggleColorMode } = useColorMode();

  const Icon = useColorModeValue(MdLightMode, MdDarkMode);

  return (
    <HStack justifyContent={'space-between'} py={5} px={10} borderBottomWidth={1}>
      <Box>
        <Link to={'/'}>
          <Box color='red.500'>
            <FaAirbnb size='38px' />
          </Box>
        </Link>
      </Box>

      <Box>
        <Tabs variant={'unstyled'}>
          <TabList textColor={'gray.500'} fontWeight={'semibold'}>
            <Tab
              as={Link}
              to={'/rooms'}
              rounded={'2xl'}
              _hover={
                tabIndex ? { bgColor: 'gray.100', textColor: 'gray.600' } : undefined
              }
              _selected={{ textColor: 'gray.800' }}
            >
              Stays
            </Tab>
            <Tab
              as={Link}
              to={'/experiences'}
              rounded={'2xl'}
              _hover={
                !tabIndex ? { bgColor: 'gray.100', textColor: 'gray.600' } : undefined
              }
              _selected={{ textColor: 'gray.800' }}
            >
              Experiences
            </Tab>
          </TabList>
        </Tabs>
      </Box>

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
