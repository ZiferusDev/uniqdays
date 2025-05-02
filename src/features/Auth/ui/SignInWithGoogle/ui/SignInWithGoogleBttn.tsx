import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@shared/api';
import { useNavigate } from 'react-router-dom';
export const SignInWithGoogleBttn = () => {
  const navigate = useNavigate();
  const onSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth.currentUser) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="bg-[pink] cursor-pointer rounded-[4px] border-none p-[8px]"
      onClick={onSignInWithGoogle}
    >
      Sign in with Google
    </button>
  );
};
