import { zodResolver } from '@hookform/resolvers/zod';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { QrCode } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { useUserStore } from '../../../stores/user.ts';
import { verifyOtp } from '../api/verifyOtp.ts';
import { OtpDto } from '../types';

interface TwoFactorAuthProps {
  show: boolean;
  otpauth_url: string;
  base32: string;
  onHide: () => void;
}

const schema = z.object({
  token: z.string().min(3, 'Authentication code is required'),
});

type FormData = z.infer<typeof schema>;

export const TwoFactorAuth = ({ show, onHide, otpauth_url, base32 }: TwoFactorAuthProps) => {
  const [qrcodeUrl, setqrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    verifyOtp(data as OtpDto)
      .then((user) => {
        setLoading(false);
        NotifySuccess('Otp successfully enabled');
        onHide();
        setUser(user);
      })
      .catch((error) => {
        if (error.response && (error.response.status === 400 || error.response.status === 422)) {
          const apiResponse = error.response.data;
          NotifyError(apiResponse.message);
        } else {
          NotifyError(error.message);
        }

        setLoading(false);
        onHide();
      });
  };

  useEffect(() => {
    QRCode.toDataURL(otpauth_url).then(setqrCodeUrl);
  }, [otpauth_url]);

  return (
    <Modal show={show} onHide={() => onHide()} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="otp.tfa"></FormattedMessage>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>
          <FormattedMessage id="otp.header2"></FormattedMessage>
        </h1>
        <p>
          <FormattedMessage id="otp.text2"></FormattedMessage>
        </p>
        <ol className="ps-4 mb-0">
          <li>
            <FormattedMessage id="otp.li1"></FormattedMessage>
          </li>
          <li>
            <FormattedMessage id="otp.li2"></FormattedMessage>
          </li>
          <li>
            <FormattedMessage id="otp.li3"></FormattedMessage>
          </li>
        </ol>
        <h1>
          <FormattedMessage id="otp.scan-qr"></FormattedMessage>
        </h1>
        <p>
          <img className="block w-64 h-64 object-contain" src={qrcodeUrl} alt="qrcode url" />
        </p>
        <h1>
          <FormattedMessage id="otp.enter-manually"></FormattedMessage>
        </h1>
        <p>
          <FormattedMessage id="otp.secret-key"></FormattedMessage>: {base32}
        </p>
        <h1>
          <FormattedMessage id="otp.verify-code"></FormattedMessage>
        </h1>
        <p>
          <FormattedMessage id="otp.please-verify"></FormattedMessage>
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-7">
            <div className="mb-3 filled">
              <QrCode></QrCode>
              <Form.Control type="text" placeholder="Authentication code" {...register('token')} />
              {errors.token && (
                <div className="d-block invalid-tooltip">{errors.token.message}</div>
              )}
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide()}>
          <FormattedMessage id="general.close"></FormattedMessage>
        </Button>
        {loading ? (
          <Button variant="primary" className="mb-1" disabled>
            <Spinner as="span" animation="border" size="sm" />{' '}
            <FormattedMessage id="general.loading"></FormattedMessage>
          </Button>
        ) : (
          <Button
            onClick={() => {
              onSubmit({ token: getValues('token') });
            }}
          >
            <FormattedMessage id="otp.do-verify"></FormattedMessage>
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
