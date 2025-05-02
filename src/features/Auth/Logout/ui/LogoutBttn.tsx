import { auth } from '@shared/api';
import { signOut } from 'firebase/auth';

export const LogoutBttn = () => {
  const onLogout = () => {
    signOut(auth);
  };
  return <button onClick={onLogout}>Logout</button>;
};
