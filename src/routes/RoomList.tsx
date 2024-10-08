import { Helmet } from 'react-helmet';
import { getRoomList } from '../api';
import Room from '../components/Rooms/Room';
import RoomSkeleton from '../components/Rooms/RoomSkeleton';
import List from '../components/Shared/List';
import { IRoomList } from '../types';

export default function RoomList() {
  return (
    <>
      <Helmet>
        <title>Stays</title>
      </Helmet>
      <List<IRoomList>
        queryKey={['roomListInfo']}
        queryFn={getRoomList}
        renderSkeleton={() => <RoomSkeleton />}
        renderItem={(room: IRoomList) => (
          <Room
            pk={room.pk}
            imageUrl={room.photos[0]?.file}
            isOwner={room.is_owner}
            type={room.room_type}
            city={room.city}
            rating={room.rating}
            totalReviews={room.number_of_reviews}
            name={room.name}
            bedrooms={room.bedrooms}
            price={room.price}
          />
        )}
      ></List>
    </>
  );
}
