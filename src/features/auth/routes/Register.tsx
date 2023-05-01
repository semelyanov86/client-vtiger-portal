import { Layout } from '../components/Layout';
import { RegisterForm } from '../components/RegisterForm';
import { RegisterLeft } from '../components/RegisterLeft.tsx';

export const Register = () => {
  return (
    <Layout title="Register your account" left={RegisterLeft()} right={RegisterForm()}></Layout>
  );
};
