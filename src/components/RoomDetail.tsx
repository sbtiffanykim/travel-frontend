import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRoomDetail, getRoomReviews } from './api';
import {
  Avatar,
  Box,
  Button,
  Container,
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
import { FaStar } from 'react-icons/fa';
import { ILinkInfo, IReview, IRoomAmenity } from '../types';
import ReviewCard from './ReviewCard';

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { data: roomData, isLoading: isRoomDataLoading } = useQuery({
    queryKey: ['room', roomPk],
    queryFn: getRoomDetail,
  });
  const { data: reviewData, isLoading: isReviewsLoading } = useQuery({
    queryKey: ['rooms', roomPk, 'reviews'],
    queryFn: getRoomReviews,
  });
  const {
    isOpen: isDescriptionOpen,
    onOpen: onDescriptionOpen,
    onClose: onDescriptionClose,
  } = useDisclosure();
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose,
  } = useDisclosure();

  const capitalize = (word?: string) => {
    if (!word) return '';
    return word[0].toUpperCase() + word.slice(1);
  };

  const reviewLinkInfo: ILinkInfo = reviewData?.page ?? {
    current_page: 1,
    total_pages: 1,
    next_link: null,
    prev_link: null,
    count: 1,
  };

  const reviews: IReview[] = reviewData?.content ?? [];

  return (
    <Box mt={5} mb={20} mx={20}>
      <Skeleton height='40px' width='50%' rounded='sm' isLoaded={!isRoomDataLoading}>
        <Heading fontWeight='semibold' fontSize='3xl'>
          {roomData?.name}
        </Heading>
      </Skeleton>

      {/* Room Photos */}
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
            <Skeleton isLoaded={!isRoomDataLoading} h='100%' w='100%'>
              <Image
                src={roomData?.photos[index].file}
                w='100%'
                h='100%'
                objectFit='cover'
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      {/* Brief Room Information */}
      <Skeleton></Skeleton>
      <Grid justifyContent='flex-start' my='8'>
        <Heading fontWeight='semibold' fontSize='2xl'>
          {roomData?.room_type
            .split('_')
            .map((word: string) => capitalize(word))
            .join(' ')}{' '}
          in {roomData?.city}, {roomData?.country}
        </Heading>

        <HStack spacing={1}>
          <Text>
            {roomData?.max_capacity} guest{roomData?.max_capacity === 1 ? '' : 's'}
          </Text>
          <Text>·</Text>
          <Text>
            {roomData?.bedrooms} bedroom{roomData?.bedrooms === 1 ? '' : 's'}
          </Text>
          <Text>·</Text>
          <Text>
            {roomData?.beds} bed{roomData?.beds === 1 ? '' : 's'}
          </Text>
          <Text>·</Text>
          <Text>
            {roomData?.bathrooms} bathroom{roomData?.bathrooms === 1 ? '' : 's'}
          </Text>
        </HStack>
      </Grid>

      {/* Host Information */}
      <HStack gap={1}>
        <Avatar src={roomData?.host.profile_picture} size='md' />
        <Grid templateRows={'1fr 1fr'}>
          <Heading fontWeight='semibold' fontSize='xl'>
            Hosted by {capitalize(roomData?.host.username)}
          </Heading>
          <Text color='gray.600'>Hosted for 0 year</Text>
        </Grid>
      </HStack>

      <Divider colorScheme='blackAlpha' mt={10} />

      {/* Description */}
      <Box my={10}>
        <Text noOfLines={5}>{roomData?.description}</Text>
        <Button
          onClick={onDescriptionOpen}
          variant={'unstyled'}
          textDecoration={'underline'}
          mt={3}
        >
          Show more
        </Button>

        <Modal isOpen={isDescriptionOpen} onClose={onDescriptionClose}>
          <ModalOverlay />
          <ModalContent py={10} px={3}>
            <ModalHeader color={'gray.800'}>{roomData?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody color={'gray.600'}>{roomData?.description}</ModalBody>
          </ModalContent>
        </Modal>
      </Box>

      <Divider colorScheme='blackAlpha' mt={10} />

      {/* Amenities */}
      <Box my={10}>
        <Heading size={'md'} fontWeight={'semibold'}>
          What this place offers
        </Heading>
        <Grid templateColumns={'1fr 1fr'} gap={5}>
          {roomData?.amenities.map((amenity: IRoomAmenity) => amenity.name)}
        </Grid>
      </Box>

      <Divider colorScheme='blackAlpha' mt={10} />

      {/* reviews */}
      <Box my={10}>
        <Heading fontSize={'xl'} fontWeight={'semibold'}>
          <HStack>
            <FaStar />
            <Text>{roomData?.rating}</Text>
            <Text>·</Text>
            <Text>
              {reviews.length} review{reviews.length < 1 ? '' : 's'}
            </Text>
          </HStack>
        </Heading>
        <Container maxW='container.lg' marginX={'none'} padding={0}>
          <Grid templateColumns={'1fr 1fr'} gap={10}>
            {!isReviewsLoading && <ReviewCard reviews={reviews} />}
          </Grid>
          <Button
            variant={'outline'}
            my={8}
            borderColor={'gray.800'}
            px={8}
            py={5}
            onClick={onReviewOpen}
          >
            Show all {reviews.length} review{reviews.length < 1 ? '' : 's'}
          </Button>

          <Modal
            isOpen={isReviewOpen}
            onClose={onReviewClose}
            scrollBehavior='inside'
            size={'xl'}
          >
            <ModalOverlay />
            <ModalContent py={10} px={7}>
              <ModalHeader>
                <ModalCloseButton />
                <Heading size={'md'} fontWeight={'semibold'}>
                  {reviews.length} Review{reviews.length < 1 ? '' : 's'}
                </Heading>
              </ModalHeader>
              <ModalBody>
                {!isReviewsLoading && <ReviewCard reviews={reviews} inModal={true} />}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    </Box>
  );
}
