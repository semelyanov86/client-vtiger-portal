import ms from 'ms';
import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios';
import { Manager } from '../types';

export const getManager = (id: string): Promise<Manager> => {
  return axios.get<Manager>('/managers/' + id).then((res) => res.data);
};

export const useManager = (id: string) => {
  return useQuery<Manager, Error>({
    queryKey: ['manager', id],
    queryFn: () => getManager(id),
    retry: 3,
    cacheTime: ms('10 days'),
    staleTime: ms('7 days'),
    useErrorBoundary: false,
  });
};
