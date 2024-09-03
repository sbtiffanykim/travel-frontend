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
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import IEditRoomVariables, {
  editRoom,
  getAmenities,
  getCategories,
  getRoomDetail,
} from '../api';
import useRequireAuth from '../lib/useRequireAuth';
import useRequireHost from '../lib/useRequireHost';
import { ICategory, IRoomAmenity, IRoomDetail } from '../types';
import { FaBed, FaDollarSign, FaToilet } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { MdBedroomParent } from 'react-icons/md';
import React from 'react';

export default function EditRoom() {
  useRequireAuth();
  useRequireHost();

  const { roomPk } = useParams();
  const { data: roomData, isLoading } = useQuery<IRoomDetail>({
    queryFn: getRoomDetail,
    queryKey: ['room', roomPk],
  });
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>({
    queryFn: () => getCategories('rooms'),
    queryKey: ['categories'],
  });
  const { data: amenitiesData, isLoading: isAmenitiesLoading } = useQuery({
    queryFn: getAmenities,
    queryKey: ['amenities'],
  });

  const amenities = amenitiesData?.content as IRoomAmenity[];
  const { register, handleSubmit, setValue } = useForm<IEditRoomVariables>({
    defaultValues: {
      category: roomData?.category?.pk,
      room_type: roomData?.room_type,
    },
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('category', Number(event.target.value));
  };

  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('room_type', event.target.value);
  };

  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: editRoom,
    onError: () => {},
    onSuccess: (data: IRoomDetail) => {
      toast({
        title: 'Room Edited',
        description: 'Your room is successfully updated!',
        status: 'success',
      });
      navigate(`/rooms/${data.id}`);
    },
  });

  const onSubmit = (data: IEditRoomVariables) => {
    if (roomPk) {
      mutation.mutate({ ...data, pk: roomPk });
    }
  };

  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{`Edit: ${roomData?.name}`}</title>
      </Helmet>
      <Container>
        <Heading fontSize={'md'} fontWeight={'semibold'} textAlign={'center'}>
          Edit room
        </Heading>
        <VStack spacing={5} as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired>
            <FormLabel>name</FormLabel>
            <Input
              type='text'
              defaultValue={roomData?.name}
              {...register('name', { required: true })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>country</FormLabel>
            <Input
              type='text'
              defaultValue={roomData?.country}
              {...register('country', { required: true })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>city</FormLabel>
            <Input
              type='text'
              defaultValue={roomData?.city}
              {...register('city', { required: true })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>address</FormLabel>
            <Input
              type='text'
              defaultValue={roomData?.address}
              {...register('address', { required: true })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>description</FormLabel>
            <Textarea
              defaultValue={roomData?.description}
              {...register('description', { required: true })}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaDollarSign />} />
              <Input
                type='number'
                min={0}
                defaultValue={roomData?.price}
                {...register('price', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Maximum Occupancy</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaPerson />} />
              <Input
                type='number'
                min={0}
                defaultValue={roomData?.max_capacity}
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
                defaultValue={roomData?.bedrooms}
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
                defaultValue={roomData?.bathrooms}
                {...register('bathrooms', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Beds</FormLabel>
            <InputGroup>
              <InputLeftAddon children={<FaBed />} />
              <Input
                type='number'
                min={0}
                defaultValue={roomData?.beds}
                {...register('beds', { required: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <Checkbox defaultChecked={roomData?.pet_allowed} {...register('pet_allowed')}>
              Pet friendly?
            </Checkbox>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Room Type</FormLabel>
            <Select
              defaultValue={roomData?.room_type}
              placeholder='Choose your room type'
              {...register('room_type', { required: true })}
              onChange={handleRoomTypeChange}
            >
              <option value='entire_place'>Entire Place</option>
              <option value='private_room'>Private Room</option>
              <option value='shared_room'>Shared Room</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              defaultValue={roomData?.category.pk}
              placeholder='Choose your room category'
              {...register('category', { required: true })}
              onChange={handleCategoryChange}
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
                    defaultChecked={Boolean(
                      roomData?.amenities.find((item) => item.pk === amenity.pk)
                    )}
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
            Edit Room
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
