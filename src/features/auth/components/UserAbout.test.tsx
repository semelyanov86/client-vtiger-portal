import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';
import { AuthUser } from '../types';

import { UserAbout } from './UserAbout.tsx';

const mockedUser: AuthUser = {
  id: '14x1213',
  firstname: 'Test',
  email: 'test@example.com',
  phone: '+7 999 999 99 99',
  department: 'Marketing',
  description: 'Lorem ipsum dolor sit amet',
  lastname: 'Test',
  crmid: '14x1143',
  created_at: '2021-08-31 12:00:00',
  title: 'Test title',
  is_active: true,
} as AuthUser;

describe('UserAbout', () => {
  test('should render profile page correctly', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <UserAbout user={mockedUser} />
      </WrapToRouterAndIntl>
    );

    const departmentElement = screen.getByText('Marketing');
    const descriptionElement = screen.getByText('Lorem ipsum dolor sit amet');
    const emailElement = screen.getByText('test@example.com');
    const phoneElement = screen.getByText('+7 999 999 99 99');
    const registerDateElement = screen.getByText('8/31/2021');

    expect(departmentElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(phoneElement).toBeInTheDocument();
    expect(registerDateElement).toBeInTheDocument();

    view.unmount();
  });
});
