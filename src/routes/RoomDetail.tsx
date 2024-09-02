import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { Helmet } from 'react-helmet';
import 'react-calendar/dist/Calendar.css';
import '../calendar.css';
import { checkAvailability, getRoomDetail, getRoomReviews } from '../api';
import { ILinkInfo, IReview, IRoomAmenity, IRoomDetail } from '../types';
import { capitalize, formatDescription } from '../lib/utils';
import Reviews from '../components/Shared/Reviews';
import NoImage from '../components/Shared/NoImage';
import GuestSelector from '../components/Shared/GuestSelector';

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { data: roomData, isLoading: isRoomDataLoading } = useQuery<IRoomDetail>({
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
  const navigate = useNavigate();

  const handleReserveButton = () => {
    const reservationData = {
      pk: roomData?.id,
      photo: roomData?.photos[0].file,
      name: roomData?.name,
      type: roomData?.room_type,
      price: roomData?.price,
      reviewAverage: roomData?.rating,
      totalReviews: reviews.length,
      checkDates: convertedDates,
      petAllowed: roomData?.pet_allowed,
      maxCapacity: roomData?.max_capacity,
      guests: adults,
    };
    console.log(reservationData);
    navigate(`/rooms/${roomData?.id}/book`, { state: reservationData });
  };

  const maxCapacity = roomData?.max_capacity ?? 0;
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);

  useEffect(() => {
    // Update the adults value when the maxCapacity is defined
    if (maxCapacity > 0) {
      setAdults(maxCapacity);
    }
  }, [maxCapacity]);

  const handleIncrementAdults = () => {
    if (adults + children < maxCapacity) {
      setAdults((prevcount) => prevcount + 1);
    }
  };

  const handleIncrementChildren = () => {
    if (adults + children < maxCapacity) {
      setChildren((prevCount) => prevCount + 1);
    }
  };

  const handleDecrementAdults = () => {
    if (adults > 0) {
      setAdults((prevCount) => prevCount - 1);
    }
  };

  const handleDecrementChildren = () => {
    if (children > 0) {
      setChildren((prevCount) => prevCount - 1);
    }
  };

  return (
    <Box mt={5} mb={20} mx={20}>
      <Helmet>
        <title>{roomData ? roomData.name : 'Loading...'}</title>
      </Helmet>
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
          <HStack justifyContent={'space-between'}>
            <HStack gap={1}>
              <Avatar
                src={roomData?.host.profile_picture}
                size='md'
                bgColor={'blue.200'}
              />
              <Grid templateRows={'1fr 1fr'}>
                <Heading fontWeight='semibold' fontSize={'17'}>
                  Hosted by {capitalize(roomData?.host.username)}
                </Heading>
                <Text color='gray.600' fontSize={'14'}>
                  Hosted for 0 year
                </Text>
              </Grid>
            </HStack>
            {roomData?.is_owner ? (
              <Link to={`/rooms/${roomPk}/edit`}>
                <Button variant={'outline'} colorScheme='blue' p={2}>
                  Edit room
                </Button>
              </Link>
            ) : null}
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

          <Box>
            <GuestSelector
              label={'Adults'}
              description={'Age 13+'}
              count={adults}
              onIncrement={handleIncrementAdults}
              onDecrement={handleDecrementAdults}
              maxCapacity={maxCapacity}
            />
            <GuestSelector
              label={'Children'}
              description={'Ages 2-12'}
              count={children}
              onIncrement={handleIncrementChildren}
              onDecrement={handleDecrementChildren}
              maxCapacity={maxCapacity}
            />
          </Box>

          <Button
            my={2}
            isDisabled={!bookingData?.available}
            isLoading={isBookingDataLoading}
            w='100%'
            colorScheme='red'
            onClick={handleReserveButton}
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
        totalRating={roomData?.rating ?? 0}
        reviews={reviews}
        isReviewsLoading={isReviewsLoading}
        onReviewOpen={onReviewOpen}
        isReviewOpen={isReviewOpen}
        onReviewClose={onReviewClose}
      />
    </Box>
  );
}
