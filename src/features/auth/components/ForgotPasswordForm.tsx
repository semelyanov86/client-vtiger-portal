import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { DEFAULT_PATHS } from '../../../config';
import { useAuthContext } from '../../../lib/auth.tsx';
import { RestorePasswordDTO } from '../api/restore.ts';

import { LogoAuth } from './LogoAuth.tsx';

const schema = z.object({
  email: z.string().min(4, 'Required').email('Should be a valid email address'),
});

type FormData = z.infer<typeof schema>;

type ForgotPasswordProps = {
  onSuccess: () => void;
};

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordProps) => {
  const { restore } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    restore(data as RestorePasswordDTO)
      .then(() => onSuccess())
      .catch((err) => NotifyError(err.message));
  };

  return (
    <div
      className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border"
      data-testid="forgot-password-form"
    >
      <div className="sw-lg-50 px-5">
        <LogoAuth></LogoAuth>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Password is gone?</h2>
          <h2 className="cta-1 text-primary">Let us reset it!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please enter your email to receive a link to reset your password.</p>
          <p className="h6">
            If you are a member, please <NavLink to={DEFAULT_PATHS.LOGIN}>login</NavLink>.
          </p>
        </div>
        <div>
          <form
            id="forgotPasswordForm"
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
            <Button
              size="lg"
              type="submit"
              data-testid="submit-button"
              disabled={!isDirty || !isValid}
            >
              Send Reset Email
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
