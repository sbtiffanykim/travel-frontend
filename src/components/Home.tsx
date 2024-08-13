import { useLocation } from 'react-router-dom';
import ExperienceList from './Experiences/ExperienceList';
import RoomList from './Rooms/RoomList';

export default function Home() {
  const location = useLocation();
  return (
    <>
      {(location.pathname === '/' || location.pathname.startsWith('/rooms')) && (
        <RoomList />
      )}
      {location.pathname.startsWith('/experiences') && <ExperienceList />}
    </>
  );
}
