import { auth } from '@shared/api';
import { signOut } from 'firebase/auth';

export const LogoutBttn = () => {
  const onLogout = () => {
    signOut(auth).then(() => alert('Успешно разлогинен'));
  };
  return (
    <button
      className="bg-[orange] cursor-pointer rounded-[4px] border-none p-[8px]"
      onClick={onLogout}
    >
      Logout
    </button>
  );
};
