import { useNavigate } from 'react-router';

import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
import { RegisterLeft } from '../components/RegisterLeft.tsx';

export const Login = () => {
  const navigate = useNavigate();
  return (
    <Layout
      title="Log in to your account"
      left={RegisterLeft()}
      right={LoginForm({
        onSuccess: () => {
          navigate('/app');
        },
      })}
    ></Layout>
  );
};
