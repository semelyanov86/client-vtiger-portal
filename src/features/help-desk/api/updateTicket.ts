import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import HelpDesk from '../types';

export type UpdateTicketDTO = {
  data: {
    ticket_title: string;
    ticketpriorities: string;
    ticketseverities: string;
    ticketcategories: string;
    description: string;
  };
  ticketId: string;
};

export const updateTicket = ({ data, ticketId }: UpdateTicketDTO): Promise<HelpDesk> => {
  return axios.put<HelpDesk>(`/tickets/${ticketId}`, data).then((res) => res.data);
};

type UseUpdateTicketOptions = {
  query: RequestQuery;
  config?: MutationConfig<typeof updateTicket>;
};

export const useUpdateTicket = ({ query, config }: UseUpdateTicketOptions) => {
  return useMutation({
    onSuccess: (data: HelpDesk) => {
      queryClient.refetchQueries(['ticket', data.id]);
      queryClient.invalidateQueries({ queryKey: ['tickets', query] });
      NotifySuccess('Ticket successfully updated!');
    },
    ...config,
    mutationFn: updateTicket,
  });
};
