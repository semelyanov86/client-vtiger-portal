import { useNavigate } from 'react-router';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { Layout } from '../components/Layout.tsx';
import { RegisterLeft } from '../components/RegisterLeft.tsx';
import { ResetPasswordForm } from '../components/ResetPasswordForm.tsx';

export const Reset = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="Reset your password"
      left={RegisterLeft()}
      right={ResetPasswordForm({
        onSuccess: () => {
          NotifySuccess('Password was updated. Please login with new credentials.');
          navigate('/auth/login');
        },
      })}
    />
  );
};
