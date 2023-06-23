import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Comment } from '../types';

export const getCommentsFromCustomModule = ({
  entityId,
  module,
}: {
  entityId: string;
  module: string;
}): Promise<DataPaginationResponse<Comment>> => {
  return axios
    .get<DataPaginationResponse<Comment>>(`/custom-modules/${module}/${entityId}/comments`)
    .then((res) => res.data);
};

type QueryFnType = typeof getCommentsFromCustomModule;

type UseCommentsOptions = {
  entityId: string;
  module: string;
  enabled: boolean;
};

export const useCommentsFromCustomModule = ({ entityId, module, enabled }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['comments', entityId, module],
    queryFn: () => getCommentsFromCustomModule({ entityId, module }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
    enabled: enabled,
  });
};
