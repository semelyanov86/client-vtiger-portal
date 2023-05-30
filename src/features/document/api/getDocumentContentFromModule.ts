import { useQuery } from 'react-query';

import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { axios, DataResponse } from '../../../lib/axios.ts';
import { ExtractFnReturnType } from '../../../lib/react-query.ts';
import { DocumentContent } from '../types';

export const getDocumentContentFromModule = ({
  ticketId,
  fileId,
  module = 'tickets',
}: {
  ticketId: string;
  fileId: string;
  module?: string;
}): Promise<DocumentContent> => {
  return axios
    .get<DataResponse<DocumentContent>>(`/${module}/${ticketId}/file/${fileId}`)
    .then((res) => res.data.data);
};

type QueryFnType = typeof getDocumentContentFromModule;

type UseDocumentContentOptions = {
  ticketId: string;
  fileId: string;
  module: string;
  enabled: boolean;
};

export const useDocumentContent = ({
  ticketId,
  fileId,
  module,
  enabled,
}: UseDocumentContentOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, Error>({
    queryKey: ['document-content', fileId],
    queryFn: () =>
      getDocumentContentFromModule({
        ticketId: ticketId,
        fileId: fileId,
        module: module,
      }),
    onError: (error) => NotifyError(error.message),
    useErrorBoundary: false,
    enabled: enabled,
  });
};
