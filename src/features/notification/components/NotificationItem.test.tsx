import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { NotificationItem } from './NotificationItem.tsx';

describe('NotificationItem', async () => {
  test('should render without error', () => {
    const view = render(
      <MemoryRouter>
        <NotificationItem></NotificationItem>
      </MemoryRouter>
    );
    expect(screen.getByRole('listitem')).toBeInTheDocument();
    view.unmount();
  });
  test('renders notification detail and image correctly', () => {
    const detail = 'Notification Detail';
    const img = '/img/notification.png';
    const view = render(
      <MemoryRouter>
        <NotificationItem detail={detail} img={img} />
      </MemoryRouter>
    );
    expect(screen.getByText(detail)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', img);
    view.unmount();
  });
  test('renders link correctly', () => {
    const link = '/notifications';
    render(
      <MemoryRouter>
        <NotificationItem link={link} />
      </MemoryRouter>
    );
    const navLink = screen.getByRole('link');
    expect(navLink).toHaveAttribute('href', link);
  });
});
