import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'react-bootstrap';
import { Envelope, UpcScan, Lock } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { DEFAULT_PATHS, TERMS_AND_CONDITIONS_URL } from '../../../config';
import { useAuthContext } from '../../../lib/auth.tsx';
import { RegisterCredentialsDTO } from '../api/register.ts';

import { LogoAuth } from './LogoAuth.tsx';

const schema = z
  .object({
    email: z.string().min(1, 'Required').email('Should be a valid email address'),
    code: z.string().min(4, 'Required'),
    password: z.string().min(6, 'Required'),
    confirmPassword: z.string().min(6, 'Password confirmation is required'),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormData = z.infer<typeof schema>;

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const auth = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    auth
      .register(data as RegisterCredentialsDTO)
      .then(() => onSuccess())
      .catch((err) => NotifyError(err.message));
  };

  return (
    <>
      <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
        <div className="sw-lg-50 px-5">
          <LogoAuth></LogoAuth>
          <div className="mb-5">
            <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
            <h2 className="cta-1 text-primary">let us get the ball rolling!</h2>
          </div>
          <div className="mb-5">
            <p className="h6">Please use the form to register.</p>
            <p className="h6">
              If you are a member, please <NavLink to={DEFAULT_PATHS.LOGIN}>login</NavLink>.
            </p>
          </div>
          <div>
            <form
              id="registerForm"
              className="tooltip-end-bottom"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-3 filled form-group tooltip-end-top">
                <Envelope></Envelope>
                <Form.Control {...register('email')} type="text" placeholder="Email" />
                {errors.email && (
                  <div className="d-block invalid-tooltip">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-3 filled form-group tooltip-end-top">
                <UpcScan></UpcScan>
                <Form.Control {...register('code')} type="text" placeholder="Code" />
                {errors.code && (
                  <div className="d-block invalid-tooltip">{errors.code.message}</div>
                )}
              </div>
              <div className="mb-3 filled form-group tooltip-end-top">
                <Lock></Lock>
                <Form.Control {...register('password')} type="password" placeholder="Password" />
                {errors.password && (
                  <div className="d-block invalid-tooltip">{errors.password.message}</div>
                )}
              </div>
              <div className="mb-3 filled form-group tooltip-end-top">
                <Lock></Lock>
                <Form.Control
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <div className="d-block invalid-tooltip">{errors.confirmPassword.message}</div>
                )}
              </div>
              <div className="mb-3 position-relative form-group">
                <div className="form-check">
                  <input {...register('terms')} type="checkbox" className="form-check-input" />
                  <label className="form-check-label">
                    I have read and accept the{' '}
                    <NavLink to={TERMS_AND_CONDITIONS_URL} target="_blank">
                      terms and conditions.
                    </NavLink>
                  </label>
                </div>
                {errors.terms && (
                  <div className="d-block invalid-tooltip">{errors.terms.message}</div>
                )}
              </div>
              <Button size="lg" type="submit">
                Signup
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
