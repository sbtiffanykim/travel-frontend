import { Text, VStack } from '@chakra-ui/react';
import { MdOutlineImageNotSupported } from 'react-icons/md';

export default function NoImage() {
  return (
    <VStack alignContent={'center'} gap={1} color={'gray.600'}>
      <MdOutlineImageNotSupported size={'25'} />
      <Text color={'gray.700'} fontSize={'15'} fontWeight={'semibold'}>
        No Photos Provided by Host
      </Text>
    </VStack>
  );
}
