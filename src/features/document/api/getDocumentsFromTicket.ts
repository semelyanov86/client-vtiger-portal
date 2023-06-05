import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Document } from '../types';

export const getDocumentsFromTicket = ({
  ticketId,
  module = 'tickets',
  prefix = '',
}: {
  ticketId: string;
  module?: string;
  prefix?: string;
}): Promise<Document[]> => {
  if (!prefix) {
    prefix = '/';
  }
  return axios
    .get<DataPaginationResponse<Document>>(`${prefix}${module}/${ticketId}/documents`)
    .then((res) => res.data.data);
};

type QueryFnType = typeof getDocumentsFromTicket;

type UseDocumentsOptions = {
  ticketId: string;
  module?: string;
  prefix?: string;
};

export const useDocumentsFromTicket = ({
  ticketId,
  module = 'tickets',
  prefix = '',
}: UseDocumentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['documents', ticketId],
    queryFn: () => getDocumentsFromTicket({ ticketId, module, prefix }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
  });
};
