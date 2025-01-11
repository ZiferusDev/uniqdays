import { Suspense } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';

import { Dashboard } from 'pages/Dashboard';

type AppRoutes = 'main';

const RoutePath: Record<AppRoutes, string> = {
  main: '/',
};

const config: Record<AppRoutes, RouteProps> = {
  main: {
    path: RoutePath.main,
    element: <Dashboard />,
  },
};

export const AppRouter = () => {
  return (
    <Suspense fallback={'Ждите'}>
      <Routes>
        {Object.values(config).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};
