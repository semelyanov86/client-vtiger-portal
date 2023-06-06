import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'react-bootstrap';
import { Envelope, Lock } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { useAuthContext } from '../../../lib/auth.tsx';
import { LoginCredentialsDTO } from '../api/login.ts';
import { Token } from '../types';

import { LogoAuth } from './LogoAuth.tsx';

const schema = z.object({
  email: z.string().min(4, 'Required').email('Should be a valid email address.'),
  password: z.string().min(4, 'Required'),
});

type FormData = z.infer<typeof schema>;

type LoginFormProps = {
  onSuccess: (token: Token) => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    login(data as LoginCredentialsDTO)
      .then((data) => {
        onSuccess(data.data);
      })
      .catch((err) => NotifyError(err.message));
  };

  return (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <LogoAuth></LogoAuth>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let us get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
          <p className="h6">
            If you are not a member, please <NavLink to="/auth/register">register</NavLink>.
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <Envelope></Envelope>
              <Form.Control {...register('email')} type="text" placeholder="Email" />
              {errors.email && (
                <div className="d-block invalid-tooltip">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <Lock></Lock>
              <Form.Control {...register('password')} type="password" placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/auth/forgot">
                Forgot?
              </NavLink>
              {errors.password && (
                <div className="d-block invalid-tooltip">{errors.password.message}</div>
              )}
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
