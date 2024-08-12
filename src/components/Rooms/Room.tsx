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
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface IRoomProps {
  pk: number;
  imageUrl: string;
  type: string;
  city: string;
  rating: number;
  totalReviews: number;
  name: string;
  bedrooms: number;
  price: number;
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
}: IRoomProps) {
  const gray = useColorModeValue('gray600', 'gray.300');
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
          <Image src={imageUrl} objectFit='cover' w='100%' h='100%' />
          <IconButton
            size={'lg'}
            aria-label='Add to wishlist'
            icon={<FaRegHeart />}
            color={'white'}
            variant={'unstyled'}
            position={'absolute'}
            right={-3}
            top={0}
          ></IconButton>
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
