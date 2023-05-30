import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Document } from '../types';

export const getDocumentsFromTicket = ({ ticketId }: { ticketId: string }): Promise<Document[]> => {
  return axios
    .get<DataPaginationResponse<Document>>(`/tickets/${ticketId}/documents`)
    .then((res) => res.data.data);
};

type QueryFnType = typeof getDocumentsFromTicket;

type UseDocumentsOptions = {
  ticketId: string;
};

export const useDocumentsFromTicket = ({ ticketId }: UseDocumentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['documents', ticketId],
    queryFn: () => getDocumentsFromTicket({ ticketId }),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    useErrorBoundary: false,
  });
};
