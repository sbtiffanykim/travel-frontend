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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'rooms',
        element: <RoomList />,
      },
      {
        path: 'experiences',
        element: <ExperienceList />,
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
        path: 'experiences/:experiencePk',
        element: <ExperienceDetail />,
      },
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
