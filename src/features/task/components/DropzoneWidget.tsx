import { FC } from 'react';
import Dropzone, { defaultClassNames, IFileWithMeta } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import DropzonePreview from '../../../components/File/DropzonePreview.tsx';
import { SubmitButton } from '../../../components/File/SubmitButton.tsx';

export const DropzoneWidget: FC = () => {
  const getUploadParams = () => ({ url: 'https://httpbin.org/post' });

  const onChangeStatus = (fileWithMeta: IFileWithMeta, status: string) => {
    console.log(fileWithMeta);
    console.log(status);
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      PreviewComponent={DropzonePreview}
      submitButtonContent={null}
      accept="text/*"
      SubmitButtonComponent={SubmitButton}
      inputWithFilesContent={null}
      onChangeStatus={onChangeStatus}
      classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
      inputContent="Drop Files"
    />
  );
};
