import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { RequestQuery } from '../../misc/types/query.ts';
import { CustomModule } from '../types';

export const getEntities = (
  query: RequestQuery,
  module: string
): Promise<DataPaginationResponse<CustomModule>> => {
  return axios
    .get<DataPaginationResponse<CustomModule>>('/custom-modules/' + module, {
      params: {
        page: query.page,
        size: query.size,
        search: query.search,
        sort: query.sort,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useEntities = (query: RequestQuery, module: string) => {
  return useQuery<DataPaginationResponse<CustomModule>, Error>({
    queryKey: [module, query],
    queryFn: () => getEntities(query, module),
    retry: 3,
    cacheTime: ms('10 minutes'),
    staleTime: ms('5 minutes'),
    useErrorBoundary: false,
  });
};
