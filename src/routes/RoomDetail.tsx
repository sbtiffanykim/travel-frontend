import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
  Icon,
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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { checkAvailability, getRoomDetail, getRoomReviews } from '../api';
import { ILinkInfo, IReview, IRoomAmenity } from '../types';
import { capitalize, formatDescription } from '../lib/utils';
import Reviews from '../components/Shared/Reviews';
import NoImage from '../components/Shared/NoImage';

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
  const [isTruncated, setIsTruncated] = useState(false);

  const [dates, setDates] = useState<Value>(new Date());
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const isEnabled =
    Array.isArray(dates) &&
    dates.length === 2 &&
    dates.every((date) => date instanceof Date);

  const convertedDates: Date[] | undefined = isEnabled
    ? (dates as [Date, Date])
    : undefined;

  const { data: bookingData, isLoading: isBookingDataLoading } = useQuery({
    queryKey: [roomPk, convertedDates, 'availability'],
    queryFn: checkAvailability,
    enabled: isEnabled,
    gcTime: 0,
  });

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      );
    }
  }, [roomData?.description]);

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
      {roomData?.photos && roomData.photos.length > 0 ? (
        <Grid
          templateColumns={'repeat(4, 1fr)'}
          templateRows={'1fr 1fr'}
          h='50vh'
          gap={2}
          my={5}
          rounded='md'
          overflow='hidden'
        >
          {[0, 1, 2, 3, 4].map((index: number) => {
            const imageSrc =
              roomData?.photos[index]?.file ||
              roomData?.photos[index % roomData.photos.length]?.file;
            return (
              <GridItem
                key={index}
                overflow='hidden'
                colSpan={index === 0 ? 2 : 1}
                rowSpan={index === 0 ? 2 : 1}
              >
                <Skeleton isLoaded={!isRoomDataLoading} h='100%' w='100%'>
                  {roomData?.photos && roomData.photos.length > 0 ? (
                    <Image src={imageSrc} w='100%' h='100%' objectFit='cover' />
                  ) : null}
                </Skeleton>
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <Box
          w='100%'
          h='50vh'
          bgColor={'gray.100'}
          rounded={'md'}
          alignContent={'center'}
          my={5}
        >
          <NoImage />
        </Box>
      )}

      <Grid templateColumns={'2fr 1fr'} gap={10}>
        <Box>
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
              <Heading fontWeight='semibold' fontSize={'17'}>
                Hosted by {capitalize(roomData?.host.username)}
              </Heading>
              <Text color='gray.600' fontSize={'14'}>
                Hosted for 0 year
              </Text>
            </Grid>
          </HStack>

          <Divider borderColor='gray.200' border={'2'} mt={10} />

          {/* Description */}
          <Box my={10}>
            <Text
              noOfLines={5}
              ref={descriptionRef}
              dangerouslySetInnerHTML={{
                __html: formatDescription(roomData?.description),
              }}
            />
            {isTruncated && (
              <Button
                onClick={onDescriptionOpen}
                variant={'unstyled'}
                textDecoration={'underline'}
                mt={3}
              >
                Show more
              </Button>
            )}

            <Modal
              isOpen={isDescriptionOpen}
              onClose={onDescriptionClose}
              scrollBehavior='inside'
              size={'xl'}
            >
              <ModalOverlay />
              <ModalContent py={10} px={5}>
                <ModalHeader color={'gray.800'}>{roomData?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody color={'gray.600'}>
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: formatDescription(roomData?.description),
                    }}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>

          <Divider borderColor='gray.200' border={'2'} mt={10} />

          {/* Amenities */}
          <Box my={10}>
            <Heading size={'md'} fontWeight={'semibold'}>
              What this place offers
            </Heading>
            <Container marginX={'none'} padding={0} my={6}>
              <Grid templateColumns={'1fr 1fr'} rowGap={3}>
                {roomData?.amenities.map((amenity: IRoomAmenity) => {
                  return (
                    <HStack key={amenity.pk}>
                      <Icon></Icon>
                      <Text>{amenity.name}</Text>
                    </HStack>
                  );
                })}
              </Grid>
            </Container>
          </Box>
        </Box>

        {/* Calendar */}
        <Box mt={8}>
          <Calendar
            onChange={setDates}
            next2Label={null}
            prev2Label={null}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 12 * 1000)} // allow fo
            selectRange
            value={dates}
          />
          <Button
            my={2}
            isDisabled={!bookingData?.available}
            isLoading={isBookingDataLoading}
            w='100%'
            colorScheme='red'
          >
            Reserve
          </Button>
          {bookingData?.available ? null : (
            <Text color={'red.600'} fontSize={'sm'} fontWeight={'semibold'}>
              Unfortunately, the selected dates are already booked by another guest.
              Please choose different dates.
            </Text>
          )}
        </Box>
      </Grid>

      <Divider borderColor='gray.200' border={'2'} mt={10} />

      {/* reviews */}
      <Reviews
        totalRating={roomData?.rating}
        reviews={reviews}
        isReviewsLoading={isReviewsLoading}
        onReviewOpen={onReviewOpen}
        isReviewOpen={isReviewOpen}
        onReviewClose={onReviewClose}
      />
    </Box>
  );
}
