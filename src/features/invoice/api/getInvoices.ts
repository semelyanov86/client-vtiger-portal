import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { Invoice } from '../types';

export const getInvoices = (query: RequestQuery): Promise<DataPaginationResponse<Invoice>> => {
  return axios
    .get<DataPaginationResponse<Invoice>>('/invoices/', {
      params: {
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
      },
    })
    .then((res) => res.data);
};

export const useInvoices = (query: RequestQuery) => {
  return useQuery<DataPaginationResponse<Invoice>, Error>({
    queryKey: ['invoices', query],
    queryFn: () => getInvoices(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('8 hours'),
    staleTime: ms('6 hours'),
    useErrorBoundary: false,
  });
};
