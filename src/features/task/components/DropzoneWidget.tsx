import { FC, useState } from 'react';
import Dropzone, { defaultClassNames, IFileWithMeta } from 'react-dropzone-uploader';

import 'react-dropzone-uploader/dist/styles.css';

import DropzonePreview from '../../../components/File/DropzonePreview.tsx';
import { SubmitButton } from '../../../components/File/SubmitButton.tsx';
import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { API_URL } from '../../../config';
import { getToken } from '../../../lib/token.ts';
import { queryClient } from '../../../lib/react-query.ts';

interface DropzoneWidgetProps {
  url: string;
  parentId: string;
}

export const DropzoneWidget: FC<DropzoneWidgetProps> = ({ url, parentId }) => {
  const access_token = getToken()?.value || null;
  const [isUpdatePreview, setIsUpdatePreview] = useState(false);

  const getUploadParams = () => ({
    url: API_URL + url,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const onChangeStatus = (fileWithMeta: IFileWithMeta, status: string) => {
    setIsUpdatePreview(!isUpdatePreview);
    if (status == 'error_upload') {
      NotifyError('There was an unexpected error during upload a file');
    }
    if (status == 'done') {
      NotifySuccess(`File ${fileWithMeta.file.name} uploaded and attached to ticket!`);
      queryClient.invalidateQueries(['documents', parentId]);
    }
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      accept="*"
      onChangeStatus={onChangeStatus}
      classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
      inputContent="Drop Files"
      PreviewComponent={DropzonePreview}
      SubmitButtonComponent={undefined}
    />
  );
};
