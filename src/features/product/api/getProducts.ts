import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { Product } from '../types';

export interface ProductQuery extends RequestQuery {
  discontinued: boolean;
}

export const getProducts = (query: ProductQuery): Promise<DataPaginationResponse<Product>> => {
  return axios
    .get<DataPaginationResponse<Product>>('/products/', {
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

export const useProducts = (query: ProductQuery) => {
  return useQuery<DataPaginationResponse<Product>, Error>({
    queryKey: ['products', query],
    queryFn: () => getProducts(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('3 days'),
    staleTime: ms('2 days'),
    useErrorBoundary: false,
  });
};
