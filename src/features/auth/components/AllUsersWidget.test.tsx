import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { AllUsersWidget } from './AllUsersWidget.tsx';

const mockedUser = {
  id: 0,
  crmid: '12x11',
  firstname: 'Sergei',
  lastname: 'Emelianov',
  description: 'Here is changed description second',
  account_id: '11x6',
  account_name: '',
  title: 'Director',
  department: 'Management',
  email: 'se@sergeyem.ru',
  created_at: '0001-01-01T00:00:00Z',
  updated_at: '0001-01-01T00:00:00Z',
  is_active: false,
  mailingcity: 'Cheboksary',
  mailingstreet: 'Bulvar Yunosti, 3',
  mailingcountry: 'Russia',
  othercountry: 'Russia',
  mailingstate: 'Chuvashia',
  mailingpobox: '',
  othercity: 'Cheboksary',
  otherstate: 'Chuvashia',
  mailingzip: '428010',
  otherzip: '428010',
  otherstreet: 'Bulvar Yunosti, 3',
  otherpobox: '',
  image: '',
  imageattachmentids: '12x42',
  imagecontent: '',
  phone: '+4915211100235',
};

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
