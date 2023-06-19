import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Payment } from '../types';

export const getPaymentsFromAccount = (): Promise<Payment[]> => {
  return axios.get<DataResponse<Payment[]>>(`/payments`).then((res) => res.data.data);
};

type QueryFnType = typeof getPaymentsFromAccount;

export const useUserPayments = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['payments'],
    queryFn: () => getPaymentsFromAccount(),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('2 days'),
    staleTime: ms('1 day'),
    useErrorBoundary: false,
  });
};
