import { createBrowserRouter } from 'react-router-dom';

import { Landing } from '../features/misc';
import { Error } from '../features/misc/routes/Error.tsx';
import { useAuthContext } from '../lib/auth.tsx';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const { user } = useAuthContext();
  const commonRoutes = [{ path: '/', errorElement: <Error />, element: <Landing /> }];

  const routes = user && user.id ? protectedRoutes : publicRoutes;

  return createBrowserRouter([...routes, ...commonRoutes]);
};
