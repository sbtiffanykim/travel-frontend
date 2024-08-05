import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRoomDetail } from './api';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['room', roomPk],
    queryFn: getRoomDetail,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const capitalize = (word?: string) => {
    if (!word) return '';
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <Box mt={5} mx={20}>
      <Skeleton height='40px' width='50%' rounded='sm' isLoaded={!isLoading}>
        <Heading fontWeight='semibold' fontSize='3xl'>
          {data?.name}
        </Heading>
      </Skeleton>
      <Grid
        templateColumns={'repeat(4, 1fr)'}
        templateRows={'1fr 1fr'}
        h='50vh'
        gap={2}
        my={5}
        rounded='md'
        overflow='hidden'
      >
        {[0, 1, 2, 3, 4].map((index: number) => (
          <GridItem
            key={index}
            overflow='hidden'
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
          >
            <Skeleton isLoaded={!isLoading} h='100%' w='100%'>
              <Image src={data?.photos[index].file} w='100%' h='100%' objectFit='cover' />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid justifyContent='flex-start' my='8'>
        <Heading fontWeight='semibold' fontSize='2xl'>
          {data?.room_type
            .split('_')
            .map((word: string) => capitalize(word))
            .join(' ')}{' '}
          in {data?.city}, {data?.country}
        </Heading>

        <HStack spacing={1}>
          <Text>
            {data?.max_capacity} guest{data?.max_capacity === 1 ? '' : 's'}
          </Text>
          <Text>·</Text>
          <Text>
            {data?.bedrooms} bedroom{data?.bedrooms === 1 ? '' : 's'}
          </Text>
          <Text>·</Text>
          <Text>
            {data?.beds} bed{data?.beds === 1 ? '' : 's'}
          </Text>
          <Text>·</Text>
          <Text>
            {data?.bathrooms} bathroom{data?.bathrooms === 1 ? '' : 's'}
          </Text>
        </HStack>
      </Grid>

      <HStack gap={1}>
        <Avatar src={data?.host.profile_picture} size='md' />
        <Grid templateRows={'1fr 1fr'}>
          <Heading fontWeight='semibold' fontSize='xl'>
            Hosted by {capitalize(data?.host.username)}
          </Heading>
          <Text color='gray.600'>Hosted for 0 year</Text>
        </Grid>
      </HStack>

      <Divider colorScheme='blackAlpha' mt={10} />

      <Box my={10}>
        <Text noOfLines={5}>{data?.description}</Text>
        <Button onClick={onOpen} variant={'unstyled'} textDecoration={'underline'} my={3}>
          Show more
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent py={10} px={3}>
            <ModalHeader color={'gray.800'}>{data?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody color={'gray.600'}>{data?.description}</ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}
