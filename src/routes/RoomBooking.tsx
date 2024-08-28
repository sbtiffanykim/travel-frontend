import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import { FaStar, FaCcPaypal } from 'react-icons/fa';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { TbPointFilled } from 'react-icons/tb';
import { CiCreditCard1 } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';
import useRequireAuth from '../lib/useRequireAuth';
import { capitalize } from '../lib/utils';

interface IReservationData {
  photo: string;
  name: string;
  type: string;
  price: number;
  reviewAverage: number;
  totalReviews: number;
  checkDates: Date[];
}

export default function RoomBooking() {
  useRequireAuth();
  const location = useLocation();
  const pageTitle = 'Confirm and pay';
  const reservationData = location.state as IReservationData;
  console.log(reservationData);
  const [checkInDate, checkOutDate] = reservationData.checkDates;
  const getNumberOfNights = (checkInDate: Date, checkOutDate: Date) => {
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const msInDay = 24 * 60 * 60 * 1000; // 24hr * 60min * 60sec * 1000ms
    const nightsStayed = Math.ceil(timeDifference / msInDay);
    return nightsStayed;
  };
  const nights = getNumberOfNights(checkInDate, checkOutDate);
  const totalPrice = reservationData.price * nights;

  const paymentOptions = [
    { value: 'card', label: 'Credit or debit card', icon: CiCreditCard1 },
    { value: 'paypal', label: 'Paypal', icon: FaCcPaypal },
  ];

  return (
    <Box my={20} mx={10}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <HStack spacing={5} my={5}>
        <MdKeyboardArrowLeft />
        <Heading fontWeight={'semibold'} size={'lg'}>
          {pageTitle}
        </Heading>
      </HStack>

      <Grid templateColumns={'1fr 1fr'} mx={9} gap={20} my={10}>
        {/* left */}
        <VStack alignItems={'flex-start'} gap={10}>
          {/* your trip */}
          <Box w={'100%'}>
            <Heading fontSize={'23px'} fontWeight={'500'}>
              Your trip
            </Heading>
            <Grid templateColumns={'4fr 1fr'} w='100%' py={3} fontSize={'17px'}>
              <VStack spacing={1} alignItems={'flex-start'}>
                <Text fontWeight={'500'}>Dates</Text>
                <Text>2024-09-23</Text>
              </VStack>
              <Button variant={'none'} textDecoration={'underline'}>
                Edit
              </Button>
            </Grid>
            <Grid templateColumns={'4fr 1fr'} w='100%' fontSize={'17px'}>
              <VStack spacing={1} alignItems={'flex-start'}>
                <Text fontWeight={'500'}>Guests</Text>
                <Text>2</Text>
              </VStack>
              <Button variant={'none'} textDecoration={'underline'}>
                Edit
              </Button>
            </Grid>
          </Box>

          <Divider borderColor='gray.200' border={'1'} my={10} />

          {/* phone number */}
          <Box w={'100%'}>
            <Heading fontSize={'23px'} fontWeight={'500'} mb={5}>
              Required for your trip
            </Heading>
            <Text>Phone number</Text>
            <Text>Add and confirm your phone number to get trip updates.</Text>
            <label>Phone number</label>
            <Input type='number' />
          </Box>

          <Divider borderColor='gray.200' border={'1'} my={10} />

          {/* Cancellation policy */}
          <Box w={'100%'}>
            <Heading fontSize={'23px'} fontWeight={'500'} mb={5}>
              Cancellation policy
            </Heading>
            <Text>The reservation is non-refundable.</Text>
          </Box>

          <Divider borderColor='gray.200' border={'1'} my={10} />

          {/* Ground rules */}
          <Box w={'100%'}>
            <Heading fontSize={'23px'} fontWeight={'500'} mb={5}>
              Ground rules
            </Heading>
            <Text>
              We ask every guest to remember a few simple things about what makes a great
              guest.
            </Text>
            <HStack mt={3}>
              <TbPointFilled size={'7px'} />
              <Text>Follow the house rules</Text>
            </HStack>
            <HStack>
              <TbPointFilled size={'7px'} />
              <Text>Treat your Host’s home like your own</Text>
            </HStack>
          </Box>

          <Divider borderColor='gray.200' border={'1'} my={10} />

          {/*Pay with */}
          <Box w={'100%'}>
            <Heading fontSize={'23px'} fontWeight={'500'} mb={5}>
              Pay with
            </Heading>
            <Select options={paymentOptions} />
          </Box>

          <Divider borderColor='gray.200' border={'1'} my={10} />

          <Button my={10}>Confirm and pay</Button>
        </VStack>

        {/* right */}
        <VStack
          p={5}
          rounded={'md'}
          border={'1px solid'}
          borderColor={'gray.300'}
          alignItems={'flex-start'}
          color={'gray.700'}
          h={'fit-content'}
          alignSelf={'start'}
          position={'sticky'}
          top={'10vh'}
        >
          {/* roominfo */}
          <HStack spacing={5} mb={5} w={'100%'}>
            <Image
              src={reservationData.photo}
              overflow={'hidden'}
              w={'100px'}
              h={'100px'}
              objectFit={'cover'}
              rounded={'md'}
            />
            <VStack spacing={1} alignItems={'flex-start'}>
              <Text fontWeight={'semibold'} fontSize={'lg'}>
                {reservationData.name}
              </Text>
              <Text fontSize={'sm'}>
                {reservationData.type
                  .split('_')
                  .map((word: string) => capitalize(word))
                  .join(' ')}
              </Text>
              <HStack spacing={1} fontSize={'sm'}>
                <FaStar />
                <Text fontWeight={'semibold'}>
                  {reservationData.reviewAverage.toFixed(2)}
                </Text>
                <Text>({reservationData.totalReviews})</Text>
              </HStack>
            </VStack>
          </HStack>

          <Divider borderColor='gray.200' border={'1'} my={10} />

          {/* price detail */}
          <VStack py={5} alignItems={'flex-start'} w={'100%'}>
            <Heading fontWeight={'semibold'} fontSize={'2xl'}>
              Price details
            </Heading>
            <HStack w={'100%'} justifyContent={'space-between'} pt={3} color={'gray.600'}>
              <Text>
                ${reservationData.price} x {nights} night{nights > 1 ? 's' : ''}
              </Text>
              <Text>${totalPrice}</Text>
            </HStack>
            <HStack w={'100%'} justifyContent={'space-between'} color={'gray.600'}>
              <Text>Service fee</Text>
              <Text>${totalPrice}</Text>
            </HStack>
            <HStack w={'100%'} justifyContent={'space-between'} color={'gray.600'}>
              <Text>Taxes</Text>
              <Text>${totalPrice}</Text>
            </HStack>
          </VStack>

          <Divider borderColor='gray.200' border={'1'} />

          {/* price total */}
          <HStack pt={5} justifyContent={'space-between'} w={'100%'}>
            <Heading fontWeight={'semibold'} fontSize={'lg'}>
              Total
            </Heading>
            <Text>${totalPrice}</Text>
          </HStack>
        </VStack>
      </Grid>
    </Box>
  );
}
