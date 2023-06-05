import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { useUserStore } from '../../../stores/user.ts';
import { disableOtp } from '../api/disableOtp.ts';
import { OtpDto } from '../types';

interface TwoFactorDisableProps {
  show: boolean;
  onHide: () => void;
}

const schema = z.object({
  token: z.string().min(3, 'Authentication code is required'),
});

type FormData = z.infer<typeof schema>;

export const TwoFactorDisable = ({ show, onHide }: TwoFactorDisableProps) => {
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
    disableOtp(data as OtpDto)
      .then((user) => {
        setLoading(false);
        NotifySuccess('Otp disabled');
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

  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="otp.disable-header"></FormattedMessage>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <FormattedMessage id="otp.disable-content"></FormattedMessage>
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-7">
            <div className="mb-3 filled">
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
            <FormattedMessage id="otp.do-disable"></FormattedMessage>
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
