import { Card, Form, Row, Button, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { useUserStore } from '../../../stores/user.ts';

export const TwoFactorCard = () => {
  const { value: user } = useUserStore();

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
              <Button variant="outline-primary" className="mb-1">
                {user.otp_enabled ? (
                  <FormattedMessage id="otp.disable"></FormattedMessage>
                ) : (
                  <FormattedMessage id="otp.enable"></FormattedMessage>
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
