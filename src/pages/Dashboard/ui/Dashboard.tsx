import { LogoutBttn } from '@features';
import { auth } from '@shared/api';

export const Dashboard = () => {
  console.log(auth.currentUser);
  return (
    <div>
      Dashboard <LogoutBttn />
    </div>
  );
};
