import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataResponse } from '../../../lib/axios';
import { Manager } from '../types';

export const getManager = (id: string): Promise<Manager> => {
  return axios.get<DataResponse<Manager>>('/managers/' + id).then((res) => res.data.data);
};

export const useManager = (id: string, enabled = true) => {
  return useQuery<Manager, Error>({
    queryKey: ['manager', id],
    queryFn: () => getManager(id),
    retry: 3,
    cacheTime: ms('10 days'),
    staleTime: ms('7 days'),
    useErrorBoundary: false,
    enabled: enabled,
  });
};
