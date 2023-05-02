import { useNavigate } from 'react-router';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm.tsx';
import { Layout } from '../components/Layout.tsx';
import { RegisterLeft } from '../components/RegisterLeft.tsx';

export const Forgot = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="Forgot your password?"
      left={RegisterLeft()}
      right={ForgotPasswordForm({
        onSuccess: () => {
          NotifySuccess('Email with restore link was send to provided email');
          navigate('/auth/login');
        },
      })}
    />
  );
};
