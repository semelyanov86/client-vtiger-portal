import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios.ts';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import HelpDesk from '../types';

export type ChangeTicketStatusDTO = {
  data: {
    ticketstatus: string;
  };
  id: string;
};

export const changeTicketStatus = ({ data, id }: ChangeTicketStatusDTO): Promise<HelpDesk> => {
  return axios.patch<HelpDesk>(`/tickets/${id}`, data).then((res) => res.data);
};

type UseChangeTicketStatusOptions = {
  query?: RequestQuery | undefined;
  config?: MutationConfig<typeof changeTicketStatus>;
};

export const useChangeTicketStatus = ({ query, config }: UseChangeTicketStatusOptions) => {
  return useMutation({
    onSuccess: (data: HelpDesk) => {
      queryClient.refetchQueries(['ticket', data.id]);
      if (query) {
        queryClient.invalidateQueries({ queryKey: ['tickets', query] });
      }
      NotifySuccess('Ticket status changed to ' + data.ticketstatus);
    },
    ...config,
    mutationFn: changeTicketStatus,
  });
};
