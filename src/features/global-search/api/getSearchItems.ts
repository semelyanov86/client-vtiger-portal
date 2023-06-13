import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { SearchItem } from '../types';

export interface SearchQuery {
  query: string;
}

export const getSearchItems = (query: SearchQuery): Promise<SearchItem[]> => {
  return axios
    .get<DataPaginationResponse<SearchItem>>('/search', {
      params: {
        search: query.query,
      },
    })
    .then((res) => res.data.data);
};

export const useGlobalSearch = (query: SearchQuery) => {
  return useQuery<SearchItem[], Error>({
    queryKey: ['search', query],
    queryFn: () => getSearchItems(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    enabled: query.query.length > 3,
    cacheTime: ms('6 hours'),
    staleTime: ms('3 hours'),
    useErrorBoundary: false,
  });
};
