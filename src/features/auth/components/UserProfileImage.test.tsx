import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { AuthUser } from '../types';

import { UserProfileImage } from './UserProfileImage.tsx';

describe('UserProfileImage', () => {
  const user = {
    firstname: 'John',
    lastname: 'Doe',
    imagecontent: 'base64-encoded-image',
  } as AuthUser;
  test('should render user image correctly', () => {
    const view = render(<UserProfileImage user={user} onImageUpload={() => {}} />);

    const userImage = screen.getByAltText('John Doe') as HTMLImageElement;

    expect(userImage).toBeInTheDocument();
    expect(userImage.src).toContain('base64-encoded-image');

    view.unmount();
  });

  test('handles file change and calls onImageUpload', async () => {
    const onImageUploadMock = vi.fn();

    render(<UserProfileImage user={user} onImageUpload={onImageUploadMock} />);

    const file = new File(['file contents'], 'image.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('uploadImageBtn');

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(
      () => {
        expect(onImageUploadMock).toHaveBeenCalledTimes(1);
      },
      { timeout: 100 }
    );
    await waitFor(
      () => {
        expect(onImageUploadMock).toHaveBeenCalledWith({
          imagename: 'image.png',
          imagetype: 'image/png',
          imagecontent: 'data:image/png;base64,ZmlsZSBjb250ZW50cw==',
        });
      },
      { timeout: 70 }
    );
  });
});
