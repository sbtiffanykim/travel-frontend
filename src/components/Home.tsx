import { Grid } from '@chakra-ui/react';
import Room from './Room';
import RoomSkeleton from './RoomSkeleton';
import { useEffect, useState } from 'react';

interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  pk: number;
  name: string;
  country: string;
  city: string;
  description: string;
  room_type: string;
  bedrooms: number;
  price: number;
  rating: number;
  number_of_reviews: number;
  is_owner: boolean;
  photos: IPhoto[];
}

interface ILinkInfo {
  current_page: number;
  total_pages: number;
  next_link: null | string;
  prev_link: null | string;
  count: number;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [linkInfo, setLinkInfo] = useState<ILinkInfo>({} as ILinkInfo);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const fetchRooms = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/rooms');
    const data = await response.json();
    setRooms(data.content);
    setLinkInfo(data.page);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  console.log(rooms);

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
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {rooms.map((room) => (
        <Room
          imageUrl={room.photos[0].file}
          type={room.room_type}
          city={room.city}
          rating={room.rating}
          totalReviews={room.number_of_reviews}
          name={room.name}
          bedrooms={room.bedrooms}
          price={room.price}
        />
      ))}
      ;
    </Grid>
  );
}
