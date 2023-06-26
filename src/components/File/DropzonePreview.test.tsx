import { render, screen } from '@testing-library/react';
import { IFileWithMeta, IPreviewProps, IExtra } from 'react-dropzone-uploader';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import DropzonePreview from './DropzonePreview.tsx';

describe('DropzonePreview', async () => {
  const mockPreviewProps: IPreviewProps = {
    canCancel: false,
    canRemove: false,
    canRestart: false,
    files: [],
    isUpload: false,
    fileWithMeta: {} as IFileWithMeta,
    extra: {} as IExtra,
    meta: {
      id: '123', // Example value for id
      type: 'image/jpeg', // Example value for type
      uploadedDate: '2023-05-06', // Example value for uploadedDate
      percent: 100, // Example value for percent
      lastModifiedDate: '2023-05-06', // Example value for lastModifiedDate
      name: 'example.jpg',
      status: 'done',
      previewUrl: 'https://example.com/image.jpg',
      size: 1024, // 1KB
    },
  };

  test('should render the preview image', () => {
    render(<DropzonePreview {...mockPreviewProps} />);

    const previewImage = screen.getByAltText('preview image');
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute('src', mockPreviewProps.meta.previewUrl);
  });

  test('should render the fallback icon when no preview image is available', () => {
    const view = render(
      <DropzonePreview
        {...mockPreviewProps}
        meta={{ ...mockPreviewProps.meta, previewUrl: undefined }}
      />
    );

    const fallbackIcon = screen.getByTestId('fallback-icon');
    expect(fallbackIcon).toBeInTheDocument();
    view.unmount();
  });

  test('should render the error icon when status is an error state', () => {
    const view = render(
      <DropzonePreview
        {...mockPreviewProps}
        meta={{ ...mockPreviewProps.meta, status: 'error_upload' }}
      />
    );

    const errorIcon = screen.getByTestId('close-icon');
    expect(errorIcon).toBeInTheDocument();
    view.unmount();
  });

  test('should render the success icon when status is "done"', () => {
    const view = render(
      <DropzonePreview {...mockPreviewProps} meta={{ ...mockPreviewProps.meta, status: 'done' }} />
    );

    const successIcon = screen.getByTestId('check-icon');
    expect(successIcon).toBeInTheDocument();
    view.unmount();
  });

  test('should render the spinner when status is not an error state or "done"', () => {
    const view = render(
      <DropzonePreview
        {...mockPreviewProps}
        meta={{ ...mockPreviewProps.meta, status: 'uploading' }}
      />
    );

    const spinner = screen.getByTestId('preview-spinner');
    expect(spinner).toBeInTheDocument();
    view.unmount();
  });

  test('should render the file name and size', () => {
    render(<DropzonePreview {...mockPreviewProps} />);

    const fileName = screen.getByText(mockPreviewProps.meta.name);
    const fileSize = screen.getByText(`${Math.round(mockPreviewProps.meta.size / 1000)} KB`);

    expect(fileName).toBeInTheDocument();
    expect(fileSize).toBeInTheDocument();
  });
});
