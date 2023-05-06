import { createBrowserRouter } from 'react-router-dom';

import { Landing } from '../features/misc';
import { Error } from '../features/misc/routes/Error.tsx';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', errorElement: <Error />, element: <Landing /> }];

  // const routes = user ? protectedRoutes : publicRoutes;

  return createBrowserRouter([...protectedRoutes, ...publicRoutes, ...commonRoutes]);
};
