import './tailwind.css';
import { AppRouter } from '../routers/AppRouter';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
