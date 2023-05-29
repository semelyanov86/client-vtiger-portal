import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataResponse } from '../../../lib/axios.ts';

export const getStatistics = (): Promise<Statistics> => {
  return axios.get<DataResponse<Statistics>>('/statistics/').then((res) => res.data.data);
};

export const useStatistics = () => {
  return useQuery<Statistics, Error>({
    queryKey: ['statistics'],
    queryFn: () => getStatistics(),
    retry: 3,
    cacheTime: ms('20 hours'),
    staleTime: ms('10 hours'),
    useErrorBoundary: false,
  });
};
