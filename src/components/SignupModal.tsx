import { useEffect, useRef, useState } from 'react';
import {
  Button,
  IconButton,
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
  Select,
  Text,
  ToastId,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FaUser, FaLock, FaEnvelope, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api';
import { useNavigate } from 'react-router-dom';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordCVisibility = () => setShowPasswordConfirm(!showPasswordConfirm);
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const navigate = useNavigate();

  interface IForm {
    email: string;
    username: string;
    password: string;
    pwConfirm: string;
    gender: string;
    language: string;
    currency: string;
  }

  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const mutation = useMutation({
    mutationFn: signUp,
    onMutate: () => {
      toastId.current = toast({
        title: 'Processing',
        status: 'loading',
      });
    },
    onSuccess: (data) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: 'You have successfully signed up!',
          description: 'Please log in :)',
          status: 'success',
        });
      }
      onClose();
      navigate('/');
    },
    onError: (error) => {
      console.log('mutaion error', error);
    },
  });
  const password = watch('password');
  const pwConfirm = watch('pwConfirm');

  useEffect(() => {
    if (pwConfirm && password && pwConfirm !== '' && password.length > 0) {
      const idx = pwConfirm.length - 1;
      if (password[idx] !== pwConfirm[idx]) {
        setError('pwConfirm', {
          type: 'manual',
          message:
            'Passwords do not match. Please make sure both password fields are identical.',
        });
      } else {
        clearErrors('pwConfirm');
      }
    }
  }, [password, pwConfirm, setError, clearErrors]);

  const onSubmit = handleSubmit(({ email, username, password, pwConfirm }) => {
    mutation.mutate({ email, username, password, pwConfirm });
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as='form' onSubmit={onSubmit}>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<FaEnvelope />} />
              <Input
                {...register('email', { required: 'Email is required' })}
                placeholder='Email'
                type='email'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaUser />} />
              <Input
                {...register('username', { required: 'Username is required' })}
                placeholder='Username'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input
                {...register('password', { required: 'Password is required' })}
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                  onClick={togglePasswordVisibility}
                  size='sm'
                  variant={'link'}
                  icon={showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                ></IconButton>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input
                {...register('pwConfirm', {
                  required: 'Password confirmation is required',
                  validate: (value) => value === password,
                })}
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder='Confirm Password'
                isInvalid={Boolean(errors.pwConfirm?.message)}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPasswordConfirm ? 'Hide Password' : 'Show Password'}
                  onClick={togglePasswordCVisibility}
                  size='sm'
                  variant={'link'}
                  icon={showPasswordConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                ></IconButton>
              </InputRightElement>
            </InputGroup>
            {errors.pwConfirm ? (
              <Text fontSize='sm' color='red.500'>
                {errors.pwConfirm.message}
              </Text>
            ) : null}
            <InputGroup>
              <Select
                placeholder='Select Gender'
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Select
                placeholder='Select Language'
                {...register('language', { required: 'Language is required' })}
              >
                <option value='kr'>Korean</option>
                <option value='en'>English</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Select
                placeholder='Select Currency'
                {...register('currency', { required: 'Currency is required' })}
              >
                <option value='krw'>Korean Won</option>
                <option value='usd'>US Dollar</option>
              </Select>
            </InputGroup>
          </VStack>
          <Button
            type='submit'
            colorScheme='red'
            w='100%'
            mt={5}
            isLoading={mutation.isPending}
          >
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
