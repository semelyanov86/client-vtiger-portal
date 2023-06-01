import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { Faq } from '../types';

export const getStarred = (): Promise<Faq[]> => {
  return axios.get<DataPaginationResponse<Faq>>('/faqs/starred').then((res) => res.data.data);
};

export const useStarredFaqs = () => {
  return useQuery<Faq[], Error>({
    queryKey: ['faqs-starred'],
    queryFn: () => getStarred(),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('5 days'),
    staleTime: ms('3 days'),
    useErrorBoundary: false,
  });
};
