import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Invoice } from '../types';

export const getInvoice = ({ invoiceId }: { invoiceId: string }): Promise<Invoice> => {
  return axios.get<DataResponse<Invoice>>(`/invoices/${invoiceId}`).then((res) => res.data.data);
};

type QueryFnType = typeof getInvoice;

type UseInvoiceOptions = {
  invoiceId: string;
};

export const useInvoice = ({ invoiceId }: UseInvoiceOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: [invoiceId],
    queryFn: () => getInvoice({ invoiceId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('1 days'),
    staleTime: ms('12 hours'),
    useErrorBoundary: false,
  });
};
