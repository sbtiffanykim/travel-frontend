import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <h1>
      I am Root
      <Outlet />
    </h1>
  );
}
