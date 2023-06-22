import { useMutation } from 'react-query';

import { NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios } from '../../../lib/axios';
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
    onError: (_, __, context: any) => {
      if (context?.previousTickets) {
        queryClient.setQueryData([module, query], context.previousTickets);
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
