import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'react-bootstrap';
import { QrCode } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { setToken } from '../../../lib/token.ts';
import { useUserStore } from '../../../stores/user.ts';
import { validateOtp } from '../api/validateOtp.ts';
import { Token } from '../types';

import { LogoAuth } from './LogoAuth.tsx';

const schema = z.object({
  code: z.string().min(4, 'Required'),
});

type FormData = z.infer<typeof schema>;

type OtpFormProps = {
  onSuccess: () => void;
  token: Token;
};

export const OtpForm = ({ onSuccess, token }: OtpFormProps) => {
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    validateOtp({
      token: data.code,
    })
      .then((user) => {
        setToken(token.token);
        setUser(user);
        onSuccess();
      })
      .catch((error) => NotifyError(error.message));
  };

  return (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <LogoAuth></LogoAuth>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Well Done,</h2>
          <h2 className="cta-1 text-primary">
            To continue using our portal you need to enter OTP code. Please open Authenticator app
            and enter digits in field
          </h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please enter OTP password in field below.</p>
          <p className="h6">If you loosed your access, please contact administrator</p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <QrCode></QrCode>
              <Form.Control {...register('code')} type="text" placeholder="Code" />
              {errors.code && <div className="d-block invalid-tooltip">{errors.code.message}</div>}
            </div>
            <Button size="lg" type="submit">
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
