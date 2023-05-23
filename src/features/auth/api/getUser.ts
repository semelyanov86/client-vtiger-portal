import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataResponse } from '../../../lib/axios';
import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => {
  return axios
    .get<DataResponse<AuthUser>>('/users/my')
    .then((res) => res.data.data)
    .catch((error) => {
      throw new Error(`Error fetching user data: ${error.message}`);
    });
};

export const useUser = () => {
  return useQuery<AuthUser, Error>({
    queryKey: ['user'],
    queryFn: () => getUser(),
    retry: 3,
    cacheTime: ms('5 days'),
    staleTime: ms('4 days'),
    useErrorBoundary: false,
  });
};
