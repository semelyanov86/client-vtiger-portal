import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { AuthUser } from '../types';

export const getAllUsers = (): Promise<AuthUser[]> => {
  return axios
    .get<DataPaginationResponse<AuthUser>>('/users/all')
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(`Error fetching user data: ${error.message}`);
    });
};

export const useAllUsers = () => {
  return useQuery<AuthUser[], Error>({
    queryKey: ['all-user'],
    queryFn: () => getAllUsers(),
    retry: 3,
    cacheTime: ms('5 days'),
    staleTime: ms('4 days'),
    useErrorBoundary: false,
  });
};
