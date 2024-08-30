import React, { useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  chakra,
  InputGroup,
  Icon,
} from '@chakra-ui/react';
import Select, { SingleValue } from 'react-select';
import countryList from 'react-select-country-list';
import { Helmet } from 'react-helmet';
import { FaStar, FaCcPaypal, FaPaypal } from 'react-icons/fa';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { TbPointFilled } from 'react-icons/tb';
import { CiCreditCard1 } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import useRequireAuth from '../lib/useRequireAuth';
import { capitalize } from '../lib/utils';

interface IReservationData {
  pk: number;
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
  const pageTitle = 'Request to book';
  const reservationData = location.state as IReservationData;
  // console.log(reservationData);

  const [checkInDate, checkOutDate] = reservationData.checkDates;
  const formatBookingDates = (checkInDate: Date, checkOutDate: Date) => {
    const formatFullDate = (date: Date) => {
      return date.toLocaleDateString('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    };
    const formatDateWithoutYear = (date: Date) => {
      return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    };

    const checkInYear = checkInDate.getFullYear();

    if (checkInDate.getFullYear() !== checkOutDate.getFullYear()) {
      return `${formatFullDate(checkInDate)}-${formatFullDate(checkOutDate)}`;
    } else if (checkInDate.getMonth() !== checkOutDate.getMonth()) {
      return `${formatDateWithoutYear(checkInDate)}-${formatDateWithoutYear(
        checkOutDate
      )} ${checkInYear}`;
    } else {
      return `${checkInDate.getDate()}-${checkOutDate.getDate()} ${checkInDate.toLocaleString(
        'en',
        { month: 'short' }
      )} ${checkInYear}`;
    }
  };
  const getNumberOfNights = (checkInDate: Date, checkOutDate: Date) => {
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const msInDay = 24 * 60 * 60 * 1000; // 24hr * 60min * 60sec * 1000ms
    const nightsStayed = Math.ceil(timeDifference / msInDay);
    return nightsStayed;
  };
  const nights = getNumberOfNights(checkInDate, checkOutDate);
  const totalPrice = reservationData.price * nights;

  const PaymentSelect = chakra(Select<IPaymentOption>); // use select from react-select as chakra component
  interface IPaymentOption {
    value: string;
    label: string;
    icon: React.ElementType;
  }
  const paymentOptions: IPaymentOption[] = [
    { value: 'card', label: 'Credit or debit card', icon: CiCreditCard1 },
    { value: 'paypal', label: 'PayPal', icon: FaCcPaypal },
  ];
  const customStyle = {
    option: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
    }),
    control: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: '4px',
      borderColor: '#CBD5E0', // Chakra UI gray.300 color
      borderRadius: '5px',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderColor: '#CBD5E0',
    }),
  };
  const [selectedPayment, setSelectedPayment] = useState<IPaymentOption>(
    paymentOptions[0]
  );
  const handlePaymentChange = (selectedPayment: SingleValue<IPaymentOption>) => {
    if (selectedPayment) {
      setSelectedPayment(selectedPayment);
    }
  };

  interface ICountryOption {
    value: string;
    label: string;
  }
  const [country, setCountry] = useState<ICountryOption | null>();
  const countryOptions = useMemo(() => countryList().getData(), []);
  const handleCountryChange = (selectedCountry: SingleValue<ICountryOption>) => {
    setCountry(selectedCountry);
  };
  const CountrySelect = chakra(Select<ICountryOption>);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const handleAddBtn = () => {
    if (phoneNumberRef.current) {
      setPhoneNumber(phoneNumberRef.current.value);
      phoneNumberRef.current.value = '';
    }
  };

  return (
    <Box my={20} mx={10}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <HStack spacing={5} my={5}>
        <Link to={`/rooms/${reservationData.pk}`}>
          <MdKeyboardArrowLeft />
        </Link>
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
                <Text fontSize={'16px'}>
                  {formatBookingDates(checkInDate, checkOutDate)}
                </Text>
              </VStack>
              <Button variant={'none'} textDecoration={'underline'}>
                Edit
              </Button>
            </Grid>
            <Grid templateColumns={'4fr 1fr'} w='100%' fontSize={'17px'}>
              <VStack spacing={1} alignItems={'flex-start'}>
                <Text fontWeight={'500'}>Guests</Text>
                <Text fontSize={'16px'}>2</Text>
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
            <Text fontWeight={500}>Phone number</Text>
            <Text fontSize={'14px'}>
              Add and confirm your phone number to get trip updates.
            </Text>
            <InputGroup mt={2}>
              <Input type='string' mr={2} ref={phoneNumberRef} />
              <Button onClick={handleAddBtn}>Add</Button>
            </InputGroup>
            {phoneNumber ? (
              <HStack
                mt={4}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text>{phoneNumber}</Text>
                <Icon as={TiDeleteOutline} onClick={() => setPhoneNumber('')} />
              </HStack>
            ) : null}
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
            <PaymentSelect
              options={paymentOptions}
              value={selectedPayment}
              onChange={handlePaymentChange}
              defaultValue={paymentOptions[0]}
              styles={customStyle}
              formatOptionLabel={(option: IPaymentOption) => (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  color={'gray.600'}
                  fontWeight={'500'}
                >
                  <Box as={option.icon} size={'23px'} mr={3} />
                  {option.label}
                </Box>
              )}
              isSearchable={false}
              components={{ IndicatorSeparator: () => null }} // Remove the separator next to the dropdown arrow
            />
            {selectedPayment.value === 'card' ? (
              <VStack my={5} alignItems={'flex-start'}>
                <Input placeholder='Card number' />
                <InputGroup>
                  <Input placeholder='Expiration' />
                  <Input placeholder='CVV' />
                </InputGroup>
                <Input placeholder='Postcode' />
                <CountrySelect
                  placeholder='Country / region'
                  w={'100%'}
                  options={countryOptions}
                  onChange={handleCountryChange}
                  value={country}
                  isSearchable={false}
                  components={{ IndicatorSeparator: () => null }}
                  formatOptionLabel={(option) => (
                    <Text color={'gray.600'} pl={1}>
                      {option.label}
                    </Text>
                  )}
                />
              </VStack>
            ) : (
              <VStack alignItems={'flex-start'} color={'gray.600'} mt={5}>
                <Text>Log in to use PayPal.</Text>
                <Button leftIcon={<FaPaypal />} colorScheme='blue' p={5}>
                  PayPal
                </Button>
              </VStack>
            )}
          </Box>

          <Divider borderColor='gray.200' border={'1'} my={10} />

          <Button my={10} p={7} fontSize={'lg'} colorScheme='purple'>
            {pageTitle}
          </Button>
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
