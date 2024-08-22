import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
  usernameLogIn,
} from '../api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IUsernameLoginSuccess,
    IUsernameLoginError,
    IUsernameLoginVariables
  >({
    mutationFn: usernameLogIn,
    onMutate: () => {
      console.log('mutation start');
    },
    onSuccess: (data) => {
      toast({
        title: 'Welcome Back!',
        description: 'You are successfully logged in!',
        status: 'success',
      });
      onClose();
      queryClient.refetchQueries({ queryKey: ['currentUser'] });
      reset();
    },
    onError: (error) => {
      console.log('mutaion error');
    },
  });

  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

  const handleClick = () => setShow(!show);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as='form' onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems={'flex-start'}>
            <InputGroup>
              <InputLeftElement children={<FaUser />} />
              <Input
                {...register('username', { required: 'Username is required' })}
                placeholder='Username'
                isInvalid={Boolean(errors.username?.message)}
              />
            </InputGroup>
            {errors.username?.message ? (
              <Text fontSize={'xs'} color={'red.400'} mt={0}>
                {errors.username?.message}
              </Text>
            ) : null}
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input
                {...register('password', { required: 'Password is required' })}
                type={show ? 'text' : 'password'}
                placeholder='Password'
                isInvalid={Boolean(errors.password?.message)}
              />
              <InputRightElement mr={1}>
                <Button onClick={handleClick} size='xs' variant={'link'}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.username?.message ? (
              <Text fontSize={'xs'} color={'red.400'} mt={0}>
                {errors.password?.message}
              </Text>
            ) : null}
          </VStack>
          {mutation.isError ? (
            <Text color={'red.500'} fontWeight={'semibold'} textAlign={'center'}>
              Please check your username / password
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isPending}
            type='submit'
            colorScheme='red'
            w='100%'
            mt={5}
          >
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
