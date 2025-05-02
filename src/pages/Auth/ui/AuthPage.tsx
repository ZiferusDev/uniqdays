import { SignInWithGoogleBttn, LogoutBttn } from '@features';

export const AuthPage = () => {
  return (
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
