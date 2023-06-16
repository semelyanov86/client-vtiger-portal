import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { PaymentConfig } from '../types';

export const getPaymentConfig = (): Promise<PaymentConfig> => {
  return axios.get<DataResponse<PaymentConfig>>(`/payments/config`).then((res) => res.data.data);
};

type QueryFnType = typeof getPaymentConfig;

export const usePaymentConfig = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['payment-config'],
    queryFn: () => getPaymentConfig(),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('2 days'),
    staleTime: ms('1 day'),
    useErrorBoundary: false,
  });
};
