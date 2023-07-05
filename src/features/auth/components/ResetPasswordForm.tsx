import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'react-bootstrap';
import { Lock } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { DEFAULT_PATHS } from '../../../config';
import { useAuthContext } from '../../../lib/auth.tsx';

import { LogoAuth } from './LogoAuth.tsx';

const schema = z
  .object({
    password: z.string().min(6, 'Required'),
    confirmPassword: z.string().min(6, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormData = z.infer<typeof schema>;

type ResetPasswordProps = {
  onSuccess: () => void;
  token: string;
};

export const ResetPasswordForm = ({ onSuccess, token }: ResetPasswordProps) => {
  const { reset } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    reset({
      password: data.password,
      token: token,
    })
      .then(() => onSuccess())
      .catch((err) => NotifyError(err.message));
  };

  return (
    <div
      className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border"
      data-testid="reset-password-page"
    >
      <div className="sw-lg-50 px-5">
        <LogoAuth></LogoAuth>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Password trouble?</h2>
          <h2 className="cta-1 text-primary">Renew it here!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use below form to reset your password.</p>
          <p className="h6">
            If you are a member, please <NavLink to={DEFAULT_PATHS.LOGIN}>login</NavLink>.
          </p>
        </div>
        <div>
          <form id="resetForm" className="tooltip-end-bottom" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 filled">
              <Lock />
              <Form.Control {...register('password')} type="password" placeholder="Password" />
              {errors.password && (
                <div className="d-block invalid-tooltip">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-3 filled">
              <Lock />
              <Form.Control
                {...register('confirmPassword')}
                type="password"
                placeholder="Verify Password"
              />
              {errors.confirmPassword && (
                <div className="d-block invalid-tooltip">{errors.confirmPassword.message}</div>
              )}
            </div>
            <Button size="lg" type="submit" data-testid="reset-password-button">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
