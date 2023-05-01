import { Layout } from '../components/Layout.tsx';
import { RegisterLeft } from '../components/RegisterLeft.tsx';
import { ResetPasswordForm } from '../components/ResetPasswordForm.tsx';

export const Reset = () => {
  return <Layout title="Reset your password" left={RegisterLeft()} right={ResetPasswordForm()} />;
};
