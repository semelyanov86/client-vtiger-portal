import { useState } from 'react';
import { Card, Form, Row, Button, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { Spinner } from '../../../components/Elements';
import { useUserStore } from '../../../stores/user.ts';
import { generateOtp } from '../api/generateOtp.ts';
import { OtpData } from '../types';
import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { TwoFactorAuth } from './TwoFactorAuth.tsx';

export const TwoFactorCard = () => {
  const { value: user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [showModalGenerate, setShowModalGenerate] = useState(false);
  const [otp, setOtp] = useState<OtpData>({ base32: '', otpauth_url: '' });

  const onEnableClick = () => {
    setLoading(true);
    if (user.otp_enabled) {
      setLoading(false);
    } else {
      generateOtp()
        .then((otpData) => {
          setLoading(false);
          setOtp(otpData);
          setShowModalGenerate(true);
        })
        .catch((error) => {
          NotifyError(error.message);
          setLoading(false);
        });
    }
  };

  const onHide = () => {
    setShowModalGenerate(false);
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Card className="mb-5">
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <p>
              <FormattedMessage id="otp.enable-disable"></FormattedMessage>
            </p>
          </Row>
          <Row className="mt-5">
            <Col lg="4" md="3" sm="4" />
            <Col sm="4" md="9" lg="10">
              <Button variant="outline-primary" className="mb-1" onClick={() => onEnableClick()}>
                {user.otp_enabled ? (
                  <FormattedMessage id="otp.disable"></FormattedMessage>
                ) : (
                  <FormattedMessage id="otp.enable"></FormattedMessage>
                )}
              </Button>
            </Col>
          </Row>
        </Form>
        {otp.otpauth_url && (
          <TwoFactorAuth
            show={showModalGenerate}
            otpauth_url={otp.otpauth_url}
            base32={otp.base32}
            onHide={onHide}
          ></TwoFactorAuth>
        )}
      </Card.Body>
    </Card>
  );
};
