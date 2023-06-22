import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType, QueryConfig } from '../../../lib/react-query.ts';
import { CustomModule } from '../types';

export const getEntity = ({
  entityId,
  module,
}: {
  entityId: string;
  module: string;
}): Promise<CustomModule> => {
  return axios
    .get<DataResponse<CustomModule>>(`/custom-modules/${module}/${entityId}`)
    .then((res) => res.data.data);
};

type QueryFnType = typeof getEntity;

type UseTicketOptions = {
  entityId: string;
  module: string;
  enabled: boolean;
  config?: QueryConfig<QueryFnType>;
};

export const useEntity = ({ entityId, config, module, enabled }: UseTicketOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [module, entityId],
    queryFn: () => getEntity({ entityId, module }),
    retry: 3,
    cacheTime: ms('4 hours'),
    staleTime: ms('2 hours'),
    useErrorBoundary: false,
    enabled: enabled,
  });
};
