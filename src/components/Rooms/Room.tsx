import {
  Box,
  Grid,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaCamera, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import NoImage from '../Shared/NoImage';
import React from 'react';

interface IRoomProps {
  pk: number;
  imageUrl?: string;
  type: string;
  city: string;
  rating: number;
  totalReviews: number;
  name: string;
  bedrooms: number;
  price: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  type,
  city,
  rating,
  totalReviews,
  name,
  bedrooms,
  price,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue('gray600', 'gray.300');
  const navigate = useNavigate();
  const handleAddPhoto = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };

  return (
    <Link to={`/rooms/${pk}`}>
      <VStack spacing={-0.5} alignItems={'flex-start'}>
        <Box
          overflow={'hidden'}
          position='relative'
          rounded='xl'
          mb={2.5}
          h='280px'
          w='100%'
        >
          {imageUrl ? (
            <Image src={imageUrl} objectFit='cover' w='100%' h='100%' />
          ) : (
            <Box
              w='100%'
              h='100%'
              bgColor={'gray.100'}
              rounded={'lg'}
              alignContent={'center'}
            >
              <NoImage />
            </Box>
          )}
          <Box color={'gray.600'} position={'absolute'} right={-3} top={0}>
            {isOwner ? (
              <IconButton
                onClick={handleAddPhoto}
                size={'lg'}
                aria-label='Add photos'
                icon={<FaCamera />}
                variant={'unstyled'}
              />
            ) : (
              <IconButton
                size={'lg'}
                aria-label='Add to wishlist'
                icon={<FaRegHeart />}
                color={'white'}
                variant={'unstyled'}
              />
            )}
          </Box>
        </Box>
        <Grid templateColumns={'10fr 1fr'}>
          <Text noOfLines={1} fontSize='md' fontWeight='semibold'>
            {type} in {city}
          </Text>
          <HStack spacing={1} color={gray}>
            <FaStar size={15} />
            <Text>{rating?.toFixed(2)}</Text>
            <Text>({totalReviews})</Text>
          </HStack>
        </Grid>
        <Text noOfLines={1} fontSize='sm' color={gray}>
          {name}
        </Text>
        <Text noOfLines={1} fontSize='sm' color={gray}>
          {bedrooms} bedrooms
        </Text>
        <HStack spacing={1} pt={1.5}>
          <Text fontSize='sm' color={gray}>
            <Text fontWeight='semibold' as={'span'} mr={1}>
              ${price}
            </Text>
            night
          </Text>
          <Text fontSize='sm' color={gray}>
            ·
          </Text>
          <Text fontSize='sm' color={gray} decoration='underline'>
            ${price} total
          </Text>
        </HStack>
      </VStack>
    </Link>
  );
}
