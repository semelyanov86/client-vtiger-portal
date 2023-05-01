import { ForgotPasswordForm } from '../components/ForgotPasswordForm.tsx';
import { Layout } from '../components/Layout.tsx';
import { RegisterLeft } from '../components/RegisterLeft.tsx';

export const Forgot = () => {
  return (
    <Layout title="Forgot your password?" left={RegisterLeft()} right={ForgotPasswordForm()} />
  );
};
