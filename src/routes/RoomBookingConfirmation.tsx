import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { MdOutlineLocationOn } from 'react-icons/md';
import { IoTicketOutline } from 'react-icons/io5';
import {
  Box,
  Center,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getConfirmedBooking } from '../api';
import useRequireAuth from '../lib/useRequireAuth';
import { IRoomHost, IRoomList } from '../types';

export default function RoomBookingConfirmation() {
  useRequireAuth();

  interface IData {
    id: number;
    user: IRoomHost;
    room: IRoomList;
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
    <Box
      my={20}
      mx={{
        base: 10,
        lg: 20,
      }}
    >
      <Heading fontWeight={'semibold'}>Your reservation is confirmed</Heading>
      <Grid templateColumns={'1.3fr 1fr'} mt={7} h={'50vh'}>
        {/* Room info */}
        <Box p={5}>
          <Heading fontWeight={'semibold'} fontSize={'25px'}>
            {data?.room.name}
          </Heading>
          <HStack
            mt={2}
            mb={7}
            spacing={1}
            color={'gray.500'}
            fontSize={'lg'}
            fontWeight={'400'}
          >
            <MdOutlineLocationOn />
            <Text>
              {data?.room.city}, {data?.room.country}
            </Text>
          </HStack>

          <Grid
            templateColumns={'1fr auto 1fr'}
            border={'1px'}
            borderColor={'gray.200'}
            rounded={'sm'}
            borderTop={'5px'}
            color={'gray.400'}
          >
            <VStack
              borderTop={'4px'}
              borderColor={'green.300'}
              mb={3}
              spacing={1}
              align={'center'}
            >
              <Text mt={2} fontSize={'14px'}>
                CHECK IN
              </Text>
              <Text color={'green.300'} fontWeight={'semibold'} fontSize={'xl'}>
                {formatDate(data?.check_in)}
              </Text>
            </VStack>
            <Center fontSize={'2xl'}>
              <IoTicketOutline />
            </Center>
            <VStack
              borderTop={'4px'}
              borderColor={'red.300'}
              mb={3}
              spacing={1}
              align={'center'}
            >
              <Text mt={2} fontSize={'14px'}>
                CHECK OUT
              </Text>
              <Text color={'red.300'} fontWeight={'semibold'} fontSize={'xl'}>
                {formatDate(data?.check_out)}
              </Text>
            </VStack>
          </Grid>
        </Box>

        {/* Room photo */}
        <Box bg={'tomato'}>
          <Image
            src={data?.room.photos[0].file}
            objectFit={'cover'}
            overflow={'hidden'}
            h={'100%'}
            w={'100%'}
          />
        </Box>
      </Grid>
    </Box>
  );
}
