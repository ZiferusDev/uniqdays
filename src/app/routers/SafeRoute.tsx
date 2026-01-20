import { Navigate, Outlet } from 'react-router-dom'

import { auth } from '~/shared/api'

export const SafeRoute = () => (auth?.currentUser ? <Outlet /> : <Navigate to="/auth" />)
