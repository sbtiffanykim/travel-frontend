import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Room from './Room';
import RoomSkeleton from './RoomSkeleton';
import Paginator from './Paginator';
import { getRoomList } from './api';

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
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['roomListInfo', currentPage],
    queryFn: () => getRoomList(currentPage),
    placeholderData: keepPreviousData,
  });

  const linkInfo: ILinkInfo = data?.page ?? {
    current_page: 1,
    total_pages: 1,
    next_link: null,
    prev_link: null,
    count: 1,
  };
  const rooms: IRoom[] = data?.content ?? [];

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goNextPage = () => {
    if (linkInfo.next_link) {
      setCurrentPage((page) => page + 1);
    }
  };

  const goPrevPage = () => {
    if (linkInfo.prev_link) {
      setCurrentPage((page) => page - 1);
    }
  };

  return (
    <>
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
      </Grid>
      {!isLoading && linkInfo.total_pages > 1 ? (
        <Paginator
          currentPage={linkInfo.current_page}
          totalPages={linkInfo.total_pages}
          totalCount={linkInfo.count}
          goToPage={goToPage}
          goNextPage={goNextPage}
          goPrevPage={goPrevPage}
        />
      ) : null}
    </>
  );
}
