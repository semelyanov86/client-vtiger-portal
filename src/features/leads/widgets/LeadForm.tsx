import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Form } from 'react-bootstrap';
import { EnvelopeAt, Person, PhoneFlip } from 'react-bootstrap-icons';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { createLead } from '../api/createLead.ts';
import { LeadDTO } from '../types';

const schema = z.object({
  lastname: z.string().min(3),
  email: z.string().email().nonempty(),
  phone: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

export const LeadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const { formatMessage: f } = useIntl();

  const onSubmit = async (data: FieldValues) => {
    try {
      await createLead(data as LeadDTO);
      NotifySuccess('Thank you. We will contact soon');
    } catch (e: any) {
      NotifyError(e.message);
    }
  };

  return (
    <Card body>
      <div className="text-muted mb-4">
        <FormattedMessage id="leads.recommend-content"></FormattedMessage>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <div className="mb-3 filled">
            <Person></Person>
            <Form.Control
              type="text"
              placeholder={f({ id: 'lead.name' })}
              {...register('lastname')}
            />
            {errors.lastname && (
              <div className="d-block invalid-tooltip">{errors.lastname.message}</div>
            )}
          </div>
          <div className="mb-3 filled">
            <EnvelopeAt></EnvelopeAt>
            <Form.Control
              type="email"
              placeholder={f({ id: 'lead.email' })}
              {...register('email')}
            />
            {errors.email && <div className="d-block invalid-tooltip">{errors.email.message}</div>}
          </div>
          <div className="mb-3 filled">
            <PhoneFlip></PhoneFlip>
            <Form.Control
              type="text"
              placeholder={f({ id: 'lead.phone' })}
              {...register('phone')}
            />
            {errors.phone && <div className="d-block invalid-tooltip">{errors.phone.message}</div>}
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <Button variant="primary" className="btn-icon btn-icon-end" type="submit">
            <span>
              <FormattedMessage id="lead.send"></FormattedMessage>
            </span>
          </Button>
        </div>
      </Form>
    </Card>
  );
};
