import { useLocation } from 'react-router-dom';
import RoomList from './RoomList';
import ExperienceList from './ExperienceList';

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
