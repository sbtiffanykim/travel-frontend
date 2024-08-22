import useRequireAuth from '../lib/useRequireAuth';
import useRequireHost from '../lib/useRequireHost';

export default function UploadRoom() {
  useRequireAuth();
  useRequireHost();
  return <h1>upload room!</h1>;
}
