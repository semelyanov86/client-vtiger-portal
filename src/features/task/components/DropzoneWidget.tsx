import { FC } from 'react';
import Dropzone, { defaultClassNames, IFileWithMeta } from 'react-dropzone-uploader';

import 'react-dropzone-uploader/dist/styles.css';

import DropzonePreview from '../../../components/File/DropzonePreview.tsx';
import { SubmitButton } from '../../../components/File/SubmitButton.tsx';
import { NotifyError, NotifySuccess } from '../../../components/Notifications/Notification.tsx';
import { API_URL } from '../../../config';
import { getToken } from '../../../lib/token.ts';

interface DropzoneWidgetProps {
  url: string;
}

export const DropzoneWidget: FC<DropzoneWidgetProps> = ({ url }) => {
  const access_token = getToken()?.value || null;

  const getUploadParams = () => ({
    url: API_URL + url,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const onChangeStatus = (fileWithMeta: IFileWithMeta, status: string) => {
    if (status == 'error_upload') {
      NotifyError('There was an unexpected error during upload a file');
    }
    if (status == 'done') {
      NotifySuccess(`File ${fileWithMeta.file.name} uploaded and attached to ticket!`);
    }
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      PreviewComponent={DropzonePreview}
      submitButtonContent={null}
      accept="*"
      SubmitButtonComponent={SubmitButton}
      inputWithFilesContent={null}
      onChangeStatus={onChangeStatus}
      classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
      inputContent="Drop Files"
    />
  );
};
