import { zodResolver } from '@hookform/resolvers/zod';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { QrCode } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    onHide();
  };

  useEffect(() => {
    QRCode.toDataURL(otpauth_url).then(setqrCodeUrl);
  }, []);

  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Two Factor Authentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Configuring Google Authenticator or Authy</h1>
        <p>You need to pass some simple steps to setup your 2-factor authentication</p>
        <ol className="ps-4 mb-0">
          <li>Install Google AUthenticator or Authy on your smartphone</li>
          <li>In the authenticator app press + icon</li>
          <li>
            Select &quot;Scan a barcode (or QR code)&quot; and use a phone camera to scan a QR code.
          </li>
        </ol>
        <h1>Scan a QU code</h1>
        <p>
          <img className="block w-64 h-64 object-contain" src={qrcodeUrl} alt="qrcode url" />
        </p>
        <h1>Or enter a code manually into your app</h1>
        <p>Secret Key: {base32}</p>
        <h1>Verify code</h1>
        <p>For changing the settings, please verify the authentication code:</p>
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
          Close
        </Button>
        <Button onClick={() => handleSubmit(onSubmit)}>Verify and activate</Button>
      </Modal.Footer>
    </Modal>
  );
};
