import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { UserAvatar } from './UserAvatar.tsx';

describe('UserAvatar', async () => {
  test('renders user avatar with base64 image', () => {
    const altText = 'User Avatar';
    const base64Image = 'base64-encoded-image';

    render(<UserAvatar alt={altText} base64={base64Image} />);

    const userAvatar = screen.getByAltText(altText) as HTMLImageElement;

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar.src).toContain(base64Image);
  });

  test('renders default user avatar when base64 image is not provided', () => {
    const altText = 'User Avatar';

    render(<UserAvatar alt={altText} />);

    const userAvatar = screen.getByAltText(altText) as HTMLImageElement;

    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar.src).toContain('/img/profile/profile-11.webp');
  });
});
