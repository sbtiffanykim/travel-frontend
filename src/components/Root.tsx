import { Box, HStack, Button } from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Box>
      <HStack justifyContent={'space-between'} py={5} px={10} borderBottomWidth={1}>
        <Box color='red.500'>
          <FaAirbnb size='38px' />
        </Box>
        <HStack spacing={2}>
          <Button>Login</Button>
          <Button colorScheme='red'>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}
