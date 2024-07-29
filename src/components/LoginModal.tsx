import { useState } from 'react';
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
  VStack,
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<FaUser />}></InputLeftElement>
              <Input placeholder='Username'></Input>
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLock />}></InputLeftElement>
              <Input type={show ? 'text' : 'password'} placeholder='Password'></Input>
              <InputRightElement>
                <Button onClick={handleClick} size='xs' variant={'link'}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
          <Button colorScheme='red' w='100%' mt={5}>
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
