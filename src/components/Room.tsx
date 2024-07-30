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

export default function Room({ index }) {
  const gray = useColorModeValue('gray600', 'gray.300');
  return (
    <VStack spacing={-0.5} alignItems={'flex-start'}>
      <Box key={index} overflow={'hidden'} position='relative' rounded='xl' mb={2.5}>
        <Image
          minH='250'
          src='https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE4MjI4MjI3OTY3Mjg4ODY3Nw%3D%3D/original/63897870-3cbf-4d5c-9233-38376d894a97.jpeg'
        />
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
          Flat in London
        </Text>
        <HStack spacing={1} color={gray}>
          <FaStar size={15} />
          <Text>5.0</Text>
          <Text>(4)</Text>
        </HStack>
      </Grid>
      <Text noOfLines={1} fontSize='sm' color={gray}>
        BAT-3-A Soho Terrace, gorgeous 1 bedroom apt, A/C
      </Text>
      <Text noOfLines={1} fontSize='sm' color={gray}>
        2 beds
      </Text>
      <Text fontSize='sm' color={gray}>
        Professional Host
      </Text>
      <HStack spacing={1} pt={1.5}>
        <Text fontSize='sm' color={gray}>
          <Text fontWeight='semibold' as='text' mr={1}>
            $64
          </Text>
          night
        </Text>
        <Text fontSize='sm' color={gray}>
          ·
        </Text>
        <Text fontSize='sm' color={gray} decoration='underline'>
          $64 total
        </Text>
      </HStack>
    </VStack>
  );
}
