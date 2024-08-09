import { Box, HStack, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton height={250} rounded={'xl'} mb={5} />
      <HStack justifyContent={'space-between'} mb={3}>
        <SkeletonText noOfLines={1} width='70%' />
        <SkeletonText noOfLines={1} width='15%' />
      </HStack>

      <SkeletonText noOfLines={1} mb={2.5} width={'90%'} />
      <SkeletonText noOfLines={2} spacing={2.5} width={'60%'} mb={5} />
      <SkeletonText noOfLines={1} width={'50%'} />
    </Box>
  );
}
