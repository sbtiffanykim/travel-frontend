import { Box, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';
import Room from './Room';
import RoomSkeleton from './RoomSkeleton';

export default function Home() {
  return (
    <Grid
      mt={10}
      px={30}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: '1fr',
        md: '1fr 1fr',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
        '2xl': 'repeat(5, 1fr)',
      }}
    >
      <RoomSkeleton />
      <Room />
      {/* 
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 2, 2, 3, 4, 6, 7, 8].map((index) => (
        <Room key={index} />
      ))}
       */}
    </Grid>
  );
}
