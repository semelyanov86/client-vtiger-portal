import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { Faq } from '../types';

export interface FaqQuery {
  page: number;
  size: number;
}

export const getFaqs = (query: FaqQuery): Promise<Faq[]> => {
  return axios
    .get<DataPaginationResponse<Faq>>('/faqs/', {
      params: {
        page: query.page,
        size: query.size,
      },
    })
    .then((res) => res.data.data);
};

export const useFaqs = (query: FaqQuery) => {
  return useQuery<Faq[], Error>({
    queryKey: ['faqs', query],
    queryFn: () => getFaqs(query),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('3 days'),
    staleTime: ms('2 days'),
    useErrorBoundary: false,
  });
};
