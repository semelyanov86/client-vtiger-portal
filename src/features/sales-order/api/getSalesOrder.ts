import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { SalesOrder } from '../types';

export const getSalesOrder = ({ soId }: { soId: string }): Promise<SalesOrder> => {
  return axios.get<DataResponse<SalesOrder>>(`/sales-orders/${soId}`).then((res) => res.data.data);
};

type QueryFnType = typeof getSalesOrder;

type UseSalesOrderOptions = {
  soId: string;
};

export const useSalesOrder = ({ soId }: UseSalesOrderOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: [soId],
    queryFn: () => getSalesOrder({ soId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('1 days'),
    staleTime: ms('12 hours'),
    useErrorBoundary: false,
  });
};
