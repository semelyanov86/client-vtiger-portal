import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Modal } from 'react-bootstrap';
import { FieldValues, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { z } from 'zod';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { getPicklistValues } from '../../module/services/fields.ts';
import useModulesStore from '../../module/stores/module.ts';
import { useCreateTicket } from '../api/createTicket.ts';
import { HelpDeskQuery } from '../api/getTickets.ts';

interface AddTicketModalProps {
  isModalOpen: boolean;
  onHide: (hide: boolean) => void;
  query: HelpDeskQuery;
}

const schema = z.object({
  ticket_title: z.string().min(3),
  ticketpriorities: z.string().nonempty(),
  ticketseverities: z.string().nonempty(),
  ticketcategories: z.string().nonempty(),
  description: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export const AddTicketModal = ({ isModalOpen, onHide, query }: AddTicketModalProps) => {
  const { HelpDesk } = useModulesStore();
  const createTicketMutation = useCreateTicket({ query: query });
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
      await createTicketMutation.mutateAsync({
        data: {
          ticket_title: data.ticket_title,
          ticketpriorities: data.ticketpriorities,
          ticketseverities: data.ticketseverities,
          ticketcategories: data.ticketcategories,
          description: data.description,
        },
      });
      onHide(false);
    } catch (e: any) {
      NotifyError(e.message);
    }
  };

  const priorities = getPicklistValues(HelpDesk, 'ticketpriorities');
  const severities = getPicklistValues(HelpDesk, 'ticketseverities');
  const categories = getPicklistValues(HelpDesk, 'ticketcategories');

  return (
    <Modal className="modal-right" show={isModalOpen} onHide={() => onHide(false)}>
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage id="tickets.add"></FormattedMessage>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Form.Label>
              <FormattedMessage id="tickets.ticket_title" />
            </Form.Label>
            <Form.Control type="text" {...register('ticket_title')} />
            {errors.ticket_title && (
              <div className="d-block invalid-tooltip">{errors.ticket_title.message}</div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>
              <FormattedMessage id="tickets.ticketpriorities" />
            </Form.Label>
            <Form.Select {...register('ticketpriorities')}>
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
            <Form.Select {...register('ticketseverities')}>
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
            <Form.Select {...register('ticketcategories')}>
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
            <Form.Control as="textarea" rows={3} {...register('description')} />
            {errors.description && (
              <div className="d-block invalid-tooltip">{errors.description.message}</div>
            )}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={() => onHide(false)}>
          <FormattedMessage id="general.cancel"></FormattedMessage>
        </Button>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          <FormattedMessage id="tickets.save"></FormattedMessage>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
