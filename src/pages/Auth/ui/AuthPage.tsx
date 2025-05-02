import { SignInWithGoogleBttn, LogoutBttn } from '@features';
import { auth } from '@shared/api';
import { Navigate } from 'react-router-dom';

export const AuthPage = () => {
  const isAuthenticated = auth?.currentUser;
  console.log(isAuthenticated);
  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex flex-col items-center">
      <h1>Welcome to UniqDays</h1>
      <h2>Sign In!</h2>
      <div className="flex flex-col items-center gap-[10px]">
        <SignInWithGoogleBttn />
        <LogoutBttn />
      </div>
    </div>
  );
};
