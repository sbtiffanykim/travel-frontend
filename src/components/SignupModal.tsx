import { useState } from 'react';
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
  VStack,
} from '@chakra-ui/react';
import { FaUser, FaLock, FaEnvelope, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SocialLogin from './SocialLogin';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordCVisibility = () => setShowPasswordConfirm(!showPasswordConfirm);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<FaEnvelope />}></InputLeftElement>
              <Input placeholder='Email' type='email'></Input>
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaUser />}></InputLeftElement>
              <Input placeholder='Username'></Input>
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLock />}></InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
              ></Input>
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
              <InputLeftElement children={<FaLock />}></InputLeftElement>
              <Input
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder='Confirm Password'
              ></Input>
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
          </VStack>
          <Button colorScheme='red' w='100%' mt={5}>
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
