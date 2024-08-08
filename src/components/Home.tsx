import { useLocation } from 'react-router-dom';
import ExperienceList from './ExperienceList';
import RoomList from './RoomList';

export default function Home() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      {(location.pathname === '/' || location.pathname.startsWith('/rooms')) && (
        <RoomList />
      )}
      {location.pathname.startsWith('/experiences') && <ExperienceList />}
    </>
  );
}
