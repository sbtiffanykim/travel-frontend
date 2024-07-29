import { Box, Button, HStack, useDisclosure } from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack justifyContent={'space-between'} py={5} px={10} borderBottomWidth={1}>
      <Link to={'/'}>
        <Box color='red.500'>
          <FaAirbnb size='38px' />
        </Box>
      </Link>
      <HStack spacing={2}>
        <Button onClick={onOpen}>Log in</Button>
        <Button colorScheme='red'>Sign up</Button>
      </HStack>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
