import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { ServiceContract } from '../types';

export const getServiceContracts = (
  query: RequestQuery
): Promise<DataPaginationResponse<ServiceContract>> => {
  return axios
    .get<DataPaginationResponse<ServiceContract>>('/service-contracts/', {
      params: {
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
      },
    })
    .then((res) => res.data);
};

export const useServiceContracts = (query: RequestQuery) => {
  return useQuery<DataPaginationResponse<ServiceContract>, Error>({
    queryKey: ['service-contracts', query],
    queryFn: () => getServiceContracts(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('8 hours'),
    staleTime: ms('6 hours'),
    useErrorBoundary: false,
  });
};
