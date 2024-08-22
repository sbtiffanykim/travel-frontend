import { Link } from 'react-router-dom';
import { VStack, Heading, Text, Button } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <VStack bg='gray.100' justifyContent={'center'} minH='100vh'>
      <Heading>PAGE NOT FOUND</Heading>
      <Text>Oops! The page you are looking for does not exist</Text>
      <Link to='/'>
        <Button colorScheme={'red'} variant={'link'}>
          &larr; Back To Home
        </Button>
      </Link>
    </VStack>
  );
}
