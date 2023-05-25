import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import HelpDesk from '../types';

import { HelpDeskQuery } from './getTickets.ts';

export type CreateTicketDTO = {
  data: {
    ticket_title: string;
    ticketpriorities: string;
    ticketseverities: string;
    ticketcategories: string;
    description: string;
  };
};

export const createTicket = ({ data }: CreateTicketDTO): Promise<HelpDesk> => {
  return axios.post<HelpDesk>('/tickets/', data).then((res) => res.data);
};

type UseCreateTicketOptions = {
  query: HelpDeskQuery;
  config?: MutationConfig<typeof createTicket>;
};

export const useCreateTicket = ({ config, query }: UseCreateTicketOptions) => {
  return useMutation({
    onError: (_, __, context: any) => {
      if (context?.previousTickets) {
        queryClient.setQueryData(['tickets', query], context.previousTickets);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets', query] });
      NotifySuccess('Ticket created!');
    },
    ...config,
    mutationFn: createTicket,
  });
};
