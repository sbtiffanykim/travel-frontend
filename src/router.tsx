import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import NotFound from './routes/NotFound';
import RoomDetail from './components/Rooms/RoomDetail';
import Home from './components/Home';
import RoomList from './components/Rooms/RoomList';
import ExperienceList from './components/Experiences/ExperienceList';
import ExperienceDetail from './components/Experiences/ExperienceDetail';
import GithubConfirm from './routes/GithubConfirm';

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
        ],
      },
    ],
  },
]);

export default router;
