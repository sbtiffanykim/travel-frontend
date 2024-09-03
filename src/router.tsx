import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import NotFound from './routes/NotFound';
import RoomDetail from './routes/RoomDetail';
import Home from './routes/Home';
import RoomList from './routes/RoomList';
import ExperienceList from './routes/ExperienceList';
import ExperienceDetail from './routes/ExperienceDetail';
import GithubConfirm from './routes/GithubConfirm';
import KakaoConfirm from './routes/KakaoConfirm';
import NaverConfirm from './routes/NaverConfirm';
import UploadRoom from './routes/UploadRoom';
import UploadPhoto from './routes/UploadPhoto';
import RoomBooking from './routes/RoomBooking';
import RoomBookingConfirmation from './routes/RoomBookingConfirmation';
import EditRoom from './routes/EditRoom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      // Home Page
      {
        path: '',
        element: <Home />,
      },
      // Rooms
      {
        path: 'rooms',
        element: <RoomList />,
      },
      {
        path: 'rooms/upload',
        element: <UploadRoom />,
      },
      {
        path: 'rooms/:roomPk',
        element: <RoomDetail />,
      },
      {
        path: 'rooms/:roomPk/edit',
        element: <EditRoom />,
      },
      {
        path: 'rooms/:roomPk/book',
        element: <RoomBooking />,
      },
      {
        path: 'rooms/:roomPk/photos',
        element: <UploadPhoto />,
      },
      // Experiences
      {
        path: 'experiences',
        element: <ExperienceList />,
      },
      {
        path: 'experiences/:experiencePk',
        element: <ExperienceDetail />,
      },
      // Bookings
      {
        path: 'bookings/:roomPk',
        element: <RoomBookingConfirmation />,
      },
      // Social
      {
        path: 'social',
        children: [
          {
            path: 'github',
            element: <GithubConfirm />,
          },
          {
            path: 'kakao',
            element: <KakaoConfirm />,
          },
          {
            path: 'naver',
            element: <NaverConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
