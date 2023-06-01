import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { Service } from '../types';

export interface ServiceQuery extends RequestQuery {
  discontinued: boolean;
}

export const getServices = (query: ServiceQuery): Promise<DataPaginationResponse<Service>> => {
  return axios
    .get<DataPaginationResponse<Service>>('/services/', {
      params: {
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
        discontinued: query.discontinued,
      },
    })
    .then((res) => res.data);
};

export const useServices = (query: ServiceQuery) => {
  return useQuery<DataPaginationResponse<Service>, Error>({
    queryKey: ['services', query],
    queryFn: () => getServices(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('3 days'),
    staleTime: ms('2 days'),
    useErrorBoundary: false,
  });
};
