import { useNavigate } from 'react-router';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import useQuery from '../../../hooks/useQuery.ts';
import { Layout } from '../components/Layout.tsx';
import { RegisterLeft } from '../components/RegisterLeft.tsx';
import { ResetPasswordForm } from '../components/ResetPasswordForm.tsx';

export const Reset = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get('token');
  if (!token) {
    NotifyError('You did not provide anu token for this page. Please ask for new restore link');
    navigate('auth/forgot');
    return null;
  }

  return (
    <Layout
      title="Reset your password"
      left={RegisterLeft()}
      right={ResetPasswordForm({
        onSuccess: () => {
          NotifySuccess('Password was updated. Please login with new credentials.');
          navigate('/auth/login');
        },
        token: token,
      })}
    />
  );
};
