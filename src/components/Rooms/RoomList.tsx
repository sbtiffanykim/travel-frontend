import { IRoomList } from '../../types';
import { getRoomList } from '../../api';
import List from '../List';
import Room from './Room';
import RoomSkeleton from '../RoomSkeleton';

export default function RoomList() {
  return (
    <List<IRoomList>
      queryKey={['roomListInfo']}
      queryFn={getRoomList}
      renderSkeleton={() => <RoomSkeleton />}
      renderItem={(room: IRoomList) => (
        <Room
          pk={room.pk}
          imageUrl={room.photos[0].file}
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
  );
}
