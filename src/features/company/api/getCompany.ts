import ms from 'ms';
import { useQuery } from 'react-query';

import { axios } from '../../../lib/axios';
import { Company } from '../types';

export const getCompany = (): Promise<Company> => {
  return axios.get<Company>(`/company/`).then((res) => res.data);
};

export const useCompany = () => {
  return useQuery<Company, Error>({
    queryKey: ['company'],
    queryFn: () => getCompany(),
    retry: 3,
    cacheTime: ms('10 days'),
    staleTime: ms('7 days'),
    useErrorBoundary: false,
  });
};
