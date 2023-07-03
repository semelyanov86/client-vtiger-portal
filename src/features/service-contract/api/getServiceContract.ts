import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { ServiceContract } from '../types';

export const getServiceContract = ({
  contractId,
}: {
  contractId: string;
}): Promise<ServiceContract> => {
  return axios
    .get<DataResponse<ServiceContract>>(`/service-contracts/${contractId}`)
    .then((res) => res.data.data);
};

type QueryFnType = typeof getServiceContract;

type UseContractOptions = {
  contractId: string;
};

export const useServiceContract = ({ contractId }: UseContractOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: [contractId],
    queryFn: () => getServiceContract({ contractId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('1 days'),
    staleTime: ms('12 hours'),
    useErrorBoundary: false,
  });
};
