import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { updateUser } from '../api/update.ts';
import { AuthUser } from '../types';

const schema = z
  .object({
    old_password: z.string().min(6, 'Required'),
    password: z.string().min(6, 'Required'),
    confirmPassword: z.string().min(6, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormData = z.infer<typeof schema>;

export const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    updateUser(data as AuthUser)
      .then(() => {
        NotifySuccess('Password successfully updated!');
      })
      .catch((error) => NotifyError(error.message));
  };

  return (
    <Card className="mb-5">
      <Card.Body>
        <Form
          id="profileEditForm"
          onSubmit={handleSubmit(onSubmit)}
          data-testid="update-password-form"
        >
          <Row className="mb-3">
            <Col lg="2" md="3" sm="4">
              <Form.Label className="col-form-label" htmlFor="old_password">
                <FormattedMessage id="user.old-password"></FormattedMessage>
              </Form.Label>
            </Col>
            <Col sm="8" md="9" lg="10">
              <Form.Control id="old_password" type="password" {...register('old_password')} />
              {errors.old_password && (
                <div className="d-block invalid-tooltip">{errors.old_password.message}</div>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg="2" md="3" sm="4">
              <Form.Label className="col-form-label" htmlFor="password">
                <FormattedMessage id="user.password"></FormattedMessage>
              </Form.Label>
            </Col>
            <Col sm="8" md="9" lg="10">
              <Form.Control id="password" type="password" {...register('password')} />
              {errors.password && (
                <div className="d-block invalid-tooltip">{errors.password.message}</div>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg="2" md="3" sm="4">
              <Form.Label className="col-form-label" htmlFor="confirm_password">
                <FormattedMessage id="user.confirm-password"></FormattedMessage>
              </Form.Label>
            </Col>
            <Col sm="8" md="9" lg="10">
              <Form.Control
                id="confirm_password"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <div className="d-block invalid-tooltip">{errors.confirmPassword.message}</div>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg="2" md="3" sm="4" />
            <Col sm="8" md="9" lg="10">
              <Button
                type="submit"
                variant="outline-primary"
                className="mb-1"
                data-testid="update-password-btn"
              >
                <FormattedMessage id="user.update"></FormattedMessage>
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
