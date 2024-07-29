import {
  Box,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaAirbnb, FaUser, FaLock } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export default function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box>
      <HStack justifyContent={'space-between'} py={5} px={10} borderBottomWidth={1}>
        <Box color='red.500'>
          <FaAirbnb size='38px' />
        </Box>
        <HStack spacing={2}>
          <Button onClick={onOpen}>Log in</Button>
          <Button colorScheme='red'>Sign up</Button>
        </HStack>

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
              <Button colorScheme='red' w='100%' my={5}>
                Log in
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
      <Outlet />
    </Box>
  );
}
