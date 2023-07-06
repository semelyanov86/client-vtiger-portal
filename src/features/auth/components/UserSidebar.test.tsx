import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { AuthUser } from '../types';

import { UserSidebar } from './UserSidebar.tsx';

describe('UserSidebar', () => {
  const user = {
    lastname: 'Doe',
    firstname: 'John',
    title: 'Software Engineer',
    mailingcity: 'New York',
    mailingcountry: 'USA',
    imagecontent: 'base64-encoded-image',
  } as AuthUser;
  test('should render user sidebar with all information', () => {
    const view = render(<UserSidebar user={user} />);

    const userAvatar = screen.getByAltText('Doe') as HTMLImageElement;
    const userName = screen.getByText('Doe John');
    const userTitle = screen.getByText('Software Engineer');
    const userLocation = screen.getByText('New York, USA');

    expect(userAvatar).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userTitle).toBeInTheDocument();
    expect(userLocation).toBeInTheDocument();
    expect(userAvatar.src).toContain('base64-encoded-image');

    view.unmount();
  });
});
