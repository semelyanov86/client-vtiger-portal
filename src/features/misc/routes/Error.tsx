import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Layout } from '../../auth/components/Layout.tsx';
import { GeneralError } from '../components/GeneralError.tsx';
import { NotFound } from '../components/NotFound.tsx';

export const Error = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Layout title="404 Not Found" right={NotFound()}></Layout>;
  }
  return <Layout title="Server Error" right={GeneralError()}></Layout>;
};
