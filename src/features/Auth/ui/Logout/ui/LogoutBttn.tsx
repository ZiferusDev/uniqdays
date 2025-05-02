import { auth } from '@shared/api';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const LogoutBttn = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    signOut(auth).then(() => alert('Успешно разлогинен'));
    navigate(0);
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
