import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import NotFound from './routes/NotFound';
import RoomDetail from './components/RoomDetail';
import Home from './components/Home';
import RoomList from './components/RoomList';
import ExperienceList from './components/ExperienceList';
import ExperienceDetail from './components/ExperienceDetail';

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
    ],
  },
]);

export default router;
