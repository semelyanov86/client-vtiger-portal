import ms from 'ms';
import { useQuery } from 'react-query';

import { axios, DataResponse } from '../../../lib/axios.ts';
import { Account } from '../types';

export const getAccount = (): Promise<Account> => {
  return axios.get<DataResponse<Account>>('/users/my/account').then((res) => res.data.data);
};

export const useAccount = (enabled = true) => {
  return useQuery<Account, Error>({
    queryKey: ['account'],
    queryFn: () => getAccount(),
    retry: 3,
    cacheTime: ms('10 days'),
    staleTime: ms('7 days'),
    useErrorBoundary: false,
    enabled: enabled,
  });
};
