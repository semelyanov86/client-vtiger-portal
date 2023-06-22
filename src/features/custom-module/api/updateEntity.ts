import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { axios, ValidationError } from '../../../lib/axios.ts';
import { MutationConfig, queryClient } from '../../../lib/react-query.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { CustomModule } from '../types';

export type UpdateEntityDTO = {
  data: CustomModule;
  entityId: string;
  module: string;
};

export const updateEntity = ({
  data,
  entityId,
  module,
}: UpdateEntityDTO): Promise<CustomModule> => {
  return axios
    .patch<CustomModule>(`/custom-modules/${module}/${entityId}`, data)
    .then((res) => res.data);
};

type UseUpdateEntityOptions = {
  query: RequestQuery;
  config?: MutationConfig<typeof updateEntity>;
  module: string;
  id: string;
};

export const useUpdateEntity = ({ query, config, module, id }: UseUpdateEntityOptions) => {
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
      queryClient.refetchQueries([module, id]);
      queryClient.invalidateQueries({ queryKey: [module, query] });
      NotifySuccess('Entity successfully updated!');
    },
    ...config,
    mutationFn: updateEntity,
  });
};
