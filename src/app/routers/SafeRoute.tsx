import { auth } from '@shared/api';
import { Navigate, Outlet } from 'react-router-dom';

export const SafeRoute = () => (auth?.currentUser ? <Outlet /> : <Navigate to="/auth" />);
