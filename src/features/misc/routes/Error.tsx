import { Layout } from '../../auth/components/Layout.tsx';
import { NotFound } from '../components/NotFound.tsx';

export const Error = () => {
  return <Layout title="404 Not Found" right={NotFound()}></Layout>;
};
