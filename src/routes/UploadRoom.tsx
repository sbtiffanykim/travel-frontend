import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaBed, FaDollarSign, FaToilet } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { MdBedroomParent } from 'react-icons/md';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAmenities, getCategories, IUploadRoomVariables, uploadRoom } from '../api';
import { ICategory, IRoomAmenity, IRoomDetail } from '../types';
import useRequireAuth from '../lib/useRequireAuth';
import useRequireHost from '../lib/useRequireHost';
import { useNavigate } from 'react-router-dom';

export default function UploadRoom() {
  const { data: amenitiesData, isLoading: isAmenitiesLoading } = useQuery({
    queryKey: ['amenities'],
    queryFn: getAmenities,
  });
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories('rooms'),
  });
  const amenities = amenitiesData?.content as IRoomAmenity[];
  const { register, handleSubmit } = useForm<IUploadRoomVariables>();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: uploadRoom,
    onSuccess: (data: IRoomDetail) => {
      toast({
        title: 'Room created!',
        description: 'Your room is successfully uploaded',
        status: 'success',
      });
      navigate(`/rooms/${data.id}`);
    },
  });

  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };

  useRequireAuth();
  useRequireHost();

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
        <Heading textAlign={'center'}>Upload Room</Heading>
        <VStack spacing={7} as={'form'} mt={5} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type='text' {...register('name', { required: true })} />
            <FormHelperText>Write the name of your room</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Input type='text' {...register('country', { required: true })} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input type='text' {...register('city', { required: true })} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input type='text' {...register('address', { required: true })} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaDollarSign />} />
              <Input type='number' min={0} {...register('price', { required: true })} />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Maximum Occupancy</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaPerson />} />
              <Input
                type='number'
                min={0}
                {...register('max_capacity', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Bedrooms</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<MdBedroomParent />} />
              <Input
                type='number'
                min={0}
                {...register('bedrooms', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Bathrooms</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaToilet />} />
              <Input
                type='number'
                min={0}
                {...register('bathrooms', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Beds</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaBed />} />
              <Input type='number' min={0} {...register('beds', { required: true })} />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea {...register('description')} />
          </FormControl>
          <FormControl>
            <Checkbox {...register('pet_allowed')}>Pet friendly?</Checkbox>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Room Type</FormLabel>
            <Select
              placeholder='Choose your room type'
              {...register('room_type', { required: true })}
            >
              <option value='entire_place'>Entire Place</option>
              <option value='private_room'>Private Room</option>
              <option value='shared_room'>Shared Room</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder='Choose your room category'
              {...register('category', { required: true })}
            >
              {categories?.map((category) => (
                <option key={category.pk} value={category.pk}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Amenities</FormLabel>
            <Grid templateColumns={'1fr 1fr'} gap={3}>
              {amenities?.map((amenity) => (
                <Box key={amenity.pk}>
                  <Checkbox
                    value={amenity.pk}
                    {...register('amenities', { required: true })}
                  >
                    {amenity.name}
                  </Checkbox>
                  <FormHelperText mt={0}>{amenity.description}</FormHelperText>
                </Box>
              ))}
            </Grid>
          </FormControl>
          {mutation.error ? <Text>{mutation.error.message}</Text> : null}
          <Button
            isLoading={mutation.isPending}
            type='submit'
            colorScheme='red'
            size='lg'
            w='100%'
          >
            Upload Room
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
