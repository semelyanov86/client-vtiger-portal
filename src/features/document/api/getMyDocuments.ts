import ms from 'ms';
import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataPaginationResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { Document } from '../types';

export const getMyDocuments = (): Promise<Document[]> => {
  return axios
    .get<DataPaginationResponse<Document>>(`/users/my/documents`)
    .then((res) => res.data.data);
};

type QueryFnType = typeof getMyDocuments;

export const useMyDocuments = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['mydocuments'],
    queryFn: () => getMyDocuments(),
    onError: (error) => NotifyError(error.message),
    retry: 3,
    cacheTime: ms('3 days'),
    staleTime: ms('2 days'),
    useErrorBoundary: false,
  });
};
