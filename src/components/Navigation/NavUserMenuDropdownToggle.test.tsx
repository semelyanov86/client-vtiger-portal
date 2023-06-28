import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { AuthUser } from '../../features/auth';

import { NavUserMenuDropdownToggle } from './NavUserMenuDropdownToggle.tsx';

describe('NavUserMenuDropdownToggle', async () => {
  test('should render without errors', () => {
    const view = render(<NavUserMenuDropdownToggle onClick={() => {}}></NavUserMenuDropdownToggle>);
    expect(screen.getByRole('link')).toBeInTheDocument();
    view.unmount();
  });
  test('calls onClick callback when clicked', () => {
    const onClickMock = vi.fn();
    const view = render(<NavUserMenuDropdownToggle onClick={onClickMock} />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(onClickMock).toHaveBeenCalled();
    view.unmount();
  });

  test('renders user image and name correctly', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      imagecontent: 'base64image',
    } as AuthUser;
    const view = render(<NavUserMenuDropdownToggle onClick={() => {}} user={user} />);
    const profileImage = screen.getByRole('img');
    const name = screen.getByText(`${user.firstname} ${user.lastname}`);
    expect(profileImage).toHaveAttribute('src', `data:image/png;base64, ${user.imagecontent}`);
    expect(name).toBeInTheDocument();
    view.unmount();
  });

  test('renders default user icon when user image is not available', () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
    } as AuthUser;
    render(<NavUserMenuDropdownToggle onClick={() => {}} user={user} />);
    const userIcon = screen.getByTestId('user-icon');
    expect(userIcon).toBeInTheDocument();
  });
});
