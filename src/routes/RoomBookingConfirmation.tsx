import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaEnvelope, FaRegCheckCircle, FaUser } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';

import { CiLogout, CiLogin } from 'react-icons/ci';
import { FaHouse } from 'react-icons/fa6';
import { getConfirmedBooking } from '../api';
import useRequireAuth from '../lib/useRequireAuth';
import { IRoomAmenity, IRoomDetail, IRoomHost } from '../types';
import { capitalize } from '../lib/utils';

export default function RoomBookingConfirmation() {
  useRequireAuth();

  interface IData {
    id: number;
    user: IRoomHost;
    room: IRoomDetail;
    created_date: string;
    updated_date: string;
    kind: string;
    check_in: string;
    check_out: string;
    experience_date: string | null;
    guests: number;
    approval_status: string;
    is_cancelled: boolean;
    experience_session: string | null;
  }

  const params = useParams();
  const pk = params.roomPk;
  const { data, isLoading } = useQuery<IData>({
    queryFn: getConfirmedBooking,
    queryKey: ['booking', pk],
  });
  const formatDate = (date?: string) => {
    if (date) {
      const splitted = date.split('-'); // [yyyy, mm, dd]
      return `${splitted[1]}/${splitted[2]}/${splitted[0]}`;
    }
  };
  console.log(data);

  return (
    <Box w={'100vw'} h={'100vh'} bgColor={'gray.50'}>
      <Box
        my={10}
        mx={{
          base: 10,
          lg: 20,
        }}
        color={'gray.700'}
      >
        <VStack alignItems={'flex-start'}>
          <Text fontSize={'2xl'}>Congratulations!</Text>
          <HStack justifyContent={'center'}>
            <Box color={'green.400'}>
              <FaRegCheckCircle />
            </Box>
            <Text fontSize={'14px'}>
              Your booking is completed. You will soon receive a confirmation via email.
            </Text>
          </HStack>
        </VStack>

        {/* top */}
        <Grid my={5} templateColumns={'2fr 1fr'} gap={5}>
          {/* room info */}
          <Box bgColor={'white'} p={3} w={'100%'}>
            <VStack alignItems={'flex-start'} spacing={1}>
              <HStack justifyContent={'space-between'} w={'100%'}>
                <Text fontSize={'14px'}>{data?.room.name}</Text>
                <Box py={1} px={2} rounded={'sm'} bgColor={'green.300'}>
                  <Text fontSize={'xs'} fontWeight={'500'} color={'white'}>
                    {data?.room.rating}
                  </Text>
                </Box>
              </HStack>
              <Text fontSize={'13px'} color={'gray.500'}>
                {data?.room.city}, {data?.room.country}
              </Text>
            </VStack>

            <HStack my={3} fontSize={'14px'}>
              <Image
                src={data?.room.photos[0].file}
                objectFit={'cover'}
                overflow={'hidden'}
                w={'40%'}
              />
              <VStack w={'60%'}>
                <HStack gap={2} justifyContent={'space-between'}>
                  <HStack spacing={2}>
                    <CiLogin size={'24px'} />
                    <Text>Check in time 11am</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <CiLogout size={'24px'} />
                    <Text>Check out time 11am</Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>

            <VStack alignItems={'flex-start'} my={5} gap={2}>
              <Text color={'gray.600'} fontSize={'15px'}>
                What's included:
              </Text>
              <HStack spacing={4} w={'100%'}>
                {data?.room.amenities.slice(0, 5).map((amenity: IRoomAmenity) => (
                  <HStack spacing={1} fontSize={'sm'} color={'gray.500'} key={amenity.pk}>
                    <Icon as={BsDot} />
                    <Text>{amenity.name}</Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>
          </Box>

          {/* check in/out info */}
          <Box bgColor={'white'} p={3}>
            <Grid templateColumns={'1fr 1fr'}>
              <Box>
                <Text fontSize={'sm'} color={'gray.500'} ml={2}>
                  Check In
                </Text>
                <Box
                  my={1}
                  bgColor={'gray.50'}
                  p={2}
                  rounded={'sm'}
                  border={'1px'}
                  borderColor={'gray.100'}
                >
                  <Text fontSize={'sm'}>{formatDate(data?.check_in)}</Text>
                </Box>
              </Box>

              <Box>
                <Text fontSize={'sm'} color={'gray.500'} ml={2}>
                  Check Out
                </Text>
                <Box
                  my={1}
                  bgColor={'gray.50'}
                  p={2}
                  rounded={'sm'}
                  border={'1px'}
                  borderColor={'gray.100'}
                >
                  <Text fontSize={'sm'}>{formatDate(data?.check_out)}</Text>
                </Box>
              </Box>
            </Grid>

            <Grid
              gap={4}
              templateColumns={'1fr 1fr'}
              px={2}
              fontSize={'14px'}
              justifyContent={'space-evenly'}
              my={2}
              color={'gray.600'}
            >
              <HStack>
                <FaHouse />
                <Text>
                  {data?.room.room_type
                    .split('_')
                    .map((word: string) => capitalize(word))
                    .join(' ')}
                </Text>
              </HStack>
              <HStack>
                <FaUser />
                <Text>
                  {data?.guests} Guest{data?.guests && data?.guests > 1 ? 's' : ''}
                </Text>
              </HStack>
            </Grid>
            <Divider py={15} />
            <HStack
              my={5}
              fontSize={'sm'}
              color={'gray.500'}
              justifyContent={'space-between'}
              px={2}
            >
              <Text>Total Price</Text>
              <Text>price</Text>
            </HStack>
          </Box>
        </Grid>

        {/* bottom */}
        <Grid mt={3} mb={5} templateColumns={'1fr 2fr'} gap={5}>
          {/* host info */}
          <Box bgColor={'white'} p={3} w={'100%'}>
            <VStack alignItems={'flex-start'} spacing={1}>
              <Text>About your host</Text>
              <HStack spacing={2} py={2}>
                <Avatar src={data?.room.host.profile_picture} />
                <VStack spacing={0} alignItems={'flex-start'}>
                  <Text fontSize={'12px'}>Hosted by</Text>
                  <Text fontSize={'14px'}>{capitalize(data?.room.host.username)}</Text>
                </VStack>
              </HStack>
              <HStack px={1} fontSize={'15px'}>
                <FaEnvelope />
                <Text>{data?.room.host.email}</Text>
              </HStack>
            </VStack>
          </Box>

          {/* maps */}
          <VStack bgColor={'white'} p={3} alignItems={'flex-start'}>
            <Text>Maps & Address</Text>
            <Box bgColor={'gray.100'} h={'20vh'} w={'100%'} position={'relative'}>
              <Box
                bgColor={'white'}
                p={3}
                right={2}
                top={2}
                position={'absolute'}
                rounded={'sm'}
                boxShadow={'rgba(0, 0, 0, 0.1) 1.95px 1.95px 2.6px'}
              >
                <Text fontSize={'12px'} color={'gray.500'}>
                  {data?.room.address}
                </Text>
              </Box>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
}
