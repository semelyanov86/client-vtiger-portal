import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios, ValidationError } from '../../../lib/axios';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { CustomModule } from '../types';

export type CreateEntityDTO = {
  data: CustomModule;
  name: string;
};

export const createEntity = ({ data, name }: CreateEntityDTO): Promise<CustomModule> => {
  return axios.post<CustomModule>('/custom-modules/' + name, data).then((res) => res.data);
};

type UseCreateTicketOptions = {
  query: RequestQuery;
  config?: MutationConfig<typeof createEntity>;
  module: string;
};

export const useCreateEntity = ({ config, query, module }: UseCreateTicketOptions) => {
  return useMutation({
    onError: (e: AxiosError<ValidationError>, __, context: any) => {
      if (context?.previousTickets) {
        queryClient.setQueryData([module, query], context.previousTickets);
      }
      if (e.response && e.response.data && e.response.data.message) {
        NotifyError(e.response.data.message);
      } else {
        NotifyError(e.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [module, query] });
      NotifySuccess('Entity created!');
    },
    ...config,
    mutationFn: createEntity,
  });
};
