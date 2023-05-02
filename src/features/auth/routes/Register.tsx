import { useNavigate } from 'react-router';

import { Layout } from '../components/Layout';
import { RegisterForm } from '../components/RegisterForm';
import { RegisterLeft } from '../components/RegisterLeft.tsx';

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="Register your account"
      left={RegisterLeft()}
      right={RegisterForm({
        onSuccess: () => {
          navigate('/auth/login');
        },
      })}
    ></Layout>
  );
};
