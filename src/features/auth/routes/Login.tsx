import { useState } from 'react';
import { useNavigate } from 'react-router';

import { DEFAULT_PATHS } from '../../../config';
import { setToken } from '../../../lib/token.ts';
import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
import { Otp } from '../components/Otp.tsx';
import { RegisterLeft } from '../components/RegisterLeft.tsx';
import { Token } from '../types';

export const Login = () => {
  const navigate = useNavigate();
  const [tokenResult, setTokenResult] = useState<Token | null>(null);
  const [showOtp, setShowOtp] = useState(false);
  const onValidate = () => {
    navigate(DEFAULT_PATHS.DASHBOARD);
    if (tokenResult) {
      setToken(tokenResult.token);
    }
  };

  const onHide = () => {
    setShowOtp(false);
  };

  return (
    <>
      <Layout
        title="Log in to your account"
        left={RegisterLeft()}
        right={LoginForm({
          onSuccess: (token) => {
            if (token.otp_enabled) {
              setTokenResult(token);
              setShowOtp(true);
            } else {
              setToken(token.token);
              navigate(DEFAULT_PATHS.DASHBOARD);
            }
          },
        })}
      ></Layout>
      {tokenResult && <Otp onSuccess={onValidate} showPopup={showOtp} onHide={onHide}></Otp>}
    </>
  );
};
