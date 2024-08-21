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
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import SocialLogin from './SocialLogin';
import { signUp } from '../api';

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

  type FormField = keyof IForm;

  interface IErrorData {
    field: FormField;
    fail: string | string[];
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

  const getErrorMessage = (errorData: IErrorData) => {
    const message = errorData.fail;
    console.log(typeof message);

    if (typeof message === 'string') {
      return message;
    } else if (Array.isArray(message)) {
      return message.join(' ');
    } else {
      return 'An unexpected error occurred';
    }
  };

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
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as IErrorData;
      if (errorData) {
        console.log('error in mutation: ', errorData);
        const field = errorData.field;
        const errorMessage = getErrorMessage(errorData) || 'An unexpected error occured';
        console.log(errorMessage);

        setError(field, {
          type: 'manual',
          message: errorMessage,
        });

        if (toastId.current) {
          toast.update(toastId.current, {
            title: 'Sign Up Failed',
            description: errorMessage,
            status: 'error',
          });
        } else {
          toast({
            title: 'Sign Up Failed',
            description: errorMessage,
            status: 'error',
          });
        }
      }
    },
  });

  // Clear errors if user modifies value
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && errors[name]) {
        clearErrors(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, errors, clearErrors]);

  // Check if password and password confirm match
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

  const onSubmit = handleSubmit(
    ({ email, username, password, pwConfirm, gender, language, currency }) => {
      mutation.mutate({
        email,
        username,
        password,
        pwConfirm,
        gender,
        language,
        currency,
      });
    }
  );

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as='form' onSubmit={onSubmit}>
          <VStack>
            {/* field - email */}
            <InputGroup>
              <InputLeftElement children={<FaEnvelope />} />
              <Input
                {...register('email', { required: 'Email is required' })}
                placeholder='Email'
                type='email'
                isInvalid={Boolean(errors.email?.message)}
              />
            </InputGroup>
            {errors.email ? (
              <Text color='red.500' fontSize='sm'>
                {errors.email.message}
              </Text>
            ) : null}

            {/* field - username */}
            <InputGroup>
              <InputLeftElement children={<FaUser />} />
              <Input
                {...register('username', { required: 'Username is required' })}
                placeholder='Username'
                isInvalid={Boolean(errors.username?.message)}
              />
            </InputGroup>
            {errors.username ? (
              <Text color='red.500' fontSize='sm'>
                {errors.username.message}
              </Text>
            ) : null}

            {/* field - password */}
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input
                {...register('password', { required: 'Password is required' })}
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                isInvalid={Boolean(errors.password?.message)}
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
            {errors.password ? (
              <Text fontSize='sm' color='red.500'>
                {errors.password.message}
              </Text>
            ) : null}

            {/* field - password confirm */}
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

            <Select
              placeholder='Select Gender'
              {...register('gender', { required: 'Gender is required' })}
              isInvalid={Boolean(errors.gender?.message)}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </Select>

            <Select
              placeholder='Select Language'
              {...register('language', { required: 'Language is required' })}
              isInvalid={Boolean(errors.language?.message)}
            >
              <option value='kr'>Korean</option>
              <option value='en'>English</option>
            </Select>

            <Select
              placeholder='Select Currency'
              {...register('currency', { required: 'Currency is required' })}
              isInvalid={Boolean(errors.currency?.message)}
            >
              <option value='krw'>Korean Won</option>
              <option value='usd'>US Dollar</option>
            </Select>
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
