import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useRequireAuth from '../lib/useRequireAuth';
import useRequireHost from '../lib/useRequireHost';

export default function UploadPhoto() {
  useRequireAuth();
  useRequireHost();

  const { register } = useForm();
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Container>
        <VStack spacing={5}>
          <Heading>Upload Photos</Heading>
          <FormControl>
            <Input
              type='file'
              size='sm'
              accept='image/*'
              {...register('photo', { required: true })}
            />
          </FormControl>
          <Button type='submit' colorScheme='red' w='100%'>
            Upload photo
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
