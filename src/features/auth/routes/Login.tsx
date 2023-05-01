import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
import { RegisterLeft } from '../components/RegisterLeft.tsx';

export const Login = () => {
  return <Layout title="Log in to your account" left={RegisterLeft()} right={LoginForm()}></Layout>;
};
