import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { mockedUser } from '../../../lib/testMocks.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { AllUsersWidget } from './AllUsersWidget.tsx';

describe('AllUsersWidget', async () => {
  test('should render widget with no errors', () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.get = mockFn;

    const view = render(
      <WrapToRouterAndIntl>
        <AllUsersWidget></AllUsersWidget>
      </WrapToRouterAndIntl>
    );
    expect(mockFn).toBeCalledTimes(1);
    const par = screen.getByTestId('spinner');
    expect(par).toBeInTheDocument();

    view.unmount();
  });
  test('should display no data if empty array', async () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: { data: [] } }));
    axios.get = mockFn;
    const view = render(
      <WrapToRouterAndIntl>
        <AllUsersWidget></AllUsersWidget>
      </WrapToRouterAndIntl>
    );
    expect(mockFn).toBeCalledTimes(1);
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'), { timeout: 10 });
    const par = screen.getByTestId('no-data-message');
    expect(par).toBeInTheDocument();

    view.unmount();
  });
  test('should correctly display user', async () => {
    const mockFn = vi.fn().mockReturnValue(
      Promise.resolve({
        data: {
          data: [mockedUser],
          count: 1,
          page: 1,
          size: 1,
        },
      })
    );
    axios.get = mockFn;
    const view = render(
      <WrapToRouterAndIntl>
        <AllUsersWidget></AllUsersWidget>
      </WrapToRouterAndIntl>
    );
    expect(mockFn).toBeCalledTimes(1);
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'), { timeout: 10 });
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toEqual('/img/profile/profile-11.webp');
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('se@sergeyem.ru')).toBeInTheDocument();

    view.unmount();
  });
  test('should display image', async () => {
    mockedUser.imagecontent = 'decodedimage';
    const mockFn = vi.fn().mockReturnValue(
      Promise.resolve({
        data: {
          data: [mockedUser],
          count: 1,
          page: 1,
          size: 1,
        },
      })
    );
    axios.get = mockFn;
    const view = render(
      <WrapToRouterAndIntl>
        <AllUsersWidget></AllUsersWidget>
      </WrapToRouterAndIntl>
    );
    expect(mockFn).toBeCalledTimes(1);
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'), { timeout: 10 });
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toEqual('data:image/png;base64, decodedimage');

    view.unmount();
  });
});
