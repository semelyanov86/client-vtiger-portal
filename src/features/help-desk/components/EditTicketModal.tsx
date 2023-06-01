import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { RequestQuery } from '../../misc/types/query.ts';
import { getPicklistValues } from '../../module/services/fields.ts';
import useModulesStore from '../../module/stores/module.ts';
import { useTicket } from '../api/getTicket.ts';
import { useUpdateTicket } from '../api/updateTicket.ts';

interface EditTicketModalProps {
  ticketId: string;
  onHide: (ticketId: string) => void;
  query: RequestQuery;
}

const schema = z.object({
  ticket_title: z.string().min(3),
  ticketpriorities: z.string().nonempty(),
  ticketseverities: z.string().nonempty(),
  ticketcategories: z.string().nonempty(),
  description: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export const EditTicketModal = ({ ticketId, onHide, query }: EditTicketModalProps) => {
  const { HelpDesk } = useModulesStore();
  const ticketQuery = useTicket({ ticketId });
  const updateTicketMutation = useUpdateTicket({ query: query });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  if (!HelpDesk) {
    return null;
  }
  const onSubmit = async (data: FieldValues) => {
    try {
      await updateTicketMutation.mutateAsync({
        data: {
          ticket_title: data.ticket_title,
          ticketpriorities: data.ticketpriorities,
          ticketseverities: data.ticketseverities,
          ticketcategories: data.ticketcategories,
          description: data.description,
        },
        ticketId: ticketId,
      });
      onHide('');
    } catch (e: any) {
      NotifyError(e.message);
    }
  };

  const priorities = getPicklistValues(HelpDesk, 'ticketpriorities');
  const severities = getPicklistValues(HelpDesk, 'ticketseverities');
  const categories = getPicklistValues(HelpDesk, 'ticketcategories');

  return (
    <Modal className="modal-right" show={ticketId != ''} onHide={() => onHide('')}>
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage id="tickets.update"></FormattedMessage>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Form.Label>
              <FormattedMessage id="tickets.ticket_title" />
            </Form.Label>
            <Form.Control
              type="text"
              {...register('ticket_title')}
              defaultValue={ticketQuery.data?.ticket_title}
            />
            {errors.ticket_title && (
              <div className="d-block invalid-tooltip">{errors.ticket_title.message}</div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>
              <FormattedMessage id="tickets.ticketpriorities" />
            </Form.Label>
            <Form.Select
              {...register('ticketpriorities')}
              defaultValue={ticketQuery.data?.ticketpriorities}
              value={ticketQuery.data?.ticketpriorities}
            >
              <option></option>
              {priorities.map((item) => (
                <option key={item.value} value={item.value}>
                  <FormattedMessage id={'tickets.' + item.value}></FormattedMessage>
                </option>
              ))}
            </Form.Select>
            {errors.ticketpriorities && (
              <div className="d-block invalid-tooltip">{errors.ticketpriorities.message}</div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>
              <FormattedMessage id="tickets.ticketseverities" />
            </Form.Label>
            <Form.Select
              {...register('ticketseverities')}
              defaultValue={ticketQuery.data?.ticketseverities}
              value={ticketQuery.data?.ticketseverities}
            >
              <option></option>
              {severities.map((item) => (
                <option key={item.value} value={item.value}>
                  <FormattedMessage id={'tickets.' + item.value}></FormattedMessage>
                </option>
              ))}
            </Form.Select>
            {errors.ticketseverities && (
              <div className="d-block invalid-tooltip">{errors.ticketseverities.message}</div>
            )}
          </div>

          <div className="mb-3">
            <Form.Label>
              <FormattedMessage id="tickets.ticketcategories" />
            </Form.Label>
            <Form.Select
              {...register('ticketcategories')}
              defaultValue={ticketQuery.data?.ticketcategories}
              value={ticketQuery.data?.ticketcategories}
            >
              <option></option>
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  <FormattedMessage id={'tickets.' + item.value}></FormattedMessage>
                </option>
              ))}
            </Form.Select>
            {errors.ticketcategories && (
              <div className="d-block invalid-tooltip">{errors.ticketcategories.message}</div>
            )}
          </div>

          <div className="mb-3">
            <Form.Label>
              <FormattedMessage id="tickets.description" />
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('description')}
              defaultValue={ticketQuery.data?.description}
            />
            {errors.description && (
              <div className="d-block invalid-tooltip">{errors.description.message}</div>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => onHide('')}>
          <FormattedMessage id="general.cancel"></FormattedMessage>
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={updateTicketMutation.isLoading}
        >
          {updateTicketMutation.isLoading ? (
            'Loading...'
          ) : (
            <FormattedMessage id="tickets.update"></FormattedMessage>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
