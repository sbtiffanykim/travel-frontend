import { Link, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Tabs,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import useUser from '../lib/useUser';
import { logOut } from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

export default function Header() {
  const { userLoading, user, isLoggedIn } = useUser();
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
  const queryClient = useQueryClient();
  const toast = useToast();
  const toastId = useRef<ToastId>();

  const mutation = useMutation({
    mutationFn: logOut,
    onMutate: () => {
      toastId.current = toast({
        title: 'logout',
        status: 'loading',
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries({ queryKey: ['currentUser'] });
        toast.update(toastId.current, {
          title: 'Bye Bye',
          description: 'You are successfully logged out!',
          status: 'success',
        });
      }
    },
    onError: () => {},
  });

  const onLogOut = async () => {
    mutation.mutate();
  };

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
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignupOpen} colorScheme='red'>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar size={'sm'} name={user?.username} src={user?.profile_picture} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
