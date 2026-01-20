import { Suspense } from 'react'

import type { RouteProps } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

import { AuthPage } from '~/pages/Auth'
import { Dashboard } from '~/pages/Dashboard'

import { SafeRoute } from './SafeRoute'

type AppRoutes = 'home' | 'auth'

const RoutePath: Record<AppRoutes, string> = {
  home: '/',
  auth: '/auth',
}

const config: Record<AppRoutes, RouteProps & { needsAuth?: boolean }> = {
  home: {
    path: RoutePath.home,
    element: <Dashboard />,
    needsAuth: true,
  },
  auth: {
    path: RoutePath.auth,
    element: <AuthPage />,
  },
}

export const AppRouter = () => {
  return (
    <Suspense fallback={'Ждите'}>
      <Routes>
        {Object.values(config).map(({ path, element, needsAuth }) =>
          needsAuth ? (
            <Route key={'safeRoute'} path={path} element={<SafeRoute />}>
              <Route key={path} path={path} element={element} />
            </Route>
          ) : (
            <Route key={path} path={path} element={element} />
          )
        )}
      </Routes>
    </Suspense>
  )
}
