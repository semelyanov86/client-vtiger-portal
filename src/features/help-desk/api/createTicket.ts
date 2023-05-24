import HelpDesk from '../types';
import { axios } from '../../../lib/axios';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { useMutation } from 'react-query';
import { HelpDeskQuery } from './getTickets.ts';
import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';

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
  return axios.post('/tickets/', data);
};

type UseCreateTicketOptions = {
  query: HelpDeskQuery;
  config?: MutationConfig<typeof createTicket>;
};

export const useCreateTicket = ({ config, query }: UseCreateTicketOptions) => {
  return useMutation({
    onMutate: async (newTicket) => {
      await queryClient.cancelQueries(['tickets', query]);
      const previousTickets = queryClient.getQueryData<HelpDesk[]>(['tickets', query]);

      queryClient.setQueryData(['tickets', query], [...(previousTickets || []), newTicket.data]);
      return { previousTickets };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTickets) {
        queryClient.setQueryData(['tickets', query], context.previousTickets);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets', query]);
      NotifySuccess('Ticket created!');
    },
    ...config,
    mutationFn: createTicket,
  });
};
