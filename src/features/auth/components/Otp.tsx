import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { QrCode } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { useUserStore } from '../../../stores/user.ts';
import { validateOtp } from '../api/validateOtp.ts';

import { LogoAuth } from './LogoAuth.tsx';

const schema = z.object({
  code: z.string().min(4, 'Required'),
});

type FormData = z.infer<typeof schema>;

type OtpFormProps = {
  onSuccess: () => void;
  showPopup: boolean;
  onHide: () => void;
};

export const Otp = ({ onSuccess, showPopup, onHide }: OtpFormProps) => {
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    validateOtp({
      token: data.code,
    })
      .then((user) => {
        setUser(user);
        onSuccess();
      })
      .catch((error) => NotifyError(error.message));
  };

  return (
    <Modal backdrop="static" keyboard={false} show={showPopup} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title id="staticBackdropLabel">Two-Factor Authentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                {errors.code && (
                  <div className="d-block invalid-tooltip">{errors.code.message}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            const code = getValues('code');
            onSubmit({ code: code });
          }}
        >
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
