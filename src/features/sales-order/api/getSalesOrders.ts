import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { SalesOrder } from '../types';

export const getSalesOrders = (
  query: RequestQuery
): Promise<DataPaginationResponse<SalesOrder>> => {
  return axios
    .get<DataPaginationResponse<SalesOrder>>('/sales-orders/', {
      params: {
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
      },
    })
    .then((res) => res.data);
};

export const useSalesOrders = (query: RequestQuery) => {
  return useQuery<DataPaginationResponse<SalesOrder>, Error>({
    queryKey: ['invoices', query],
    queryFn: () => getSalesOrders(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('8 hours'),
    staleTime: ms('6 hours'),
    useErrorBoundary: false,
  });
};
