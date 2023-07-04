import { render, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { mockedUser, WrapToRouterAndIntl } from '../../../lib/tests.tsx';
import { useUserStore } from '../../../stores/user.ts';

import { LoadUser } from './LoadUser.tsx';

describe('LoadUser', () => {
  test('should call setUser when data is available', async () => {
    const mockedAxios = vi.fn().mockReturnValue(Promise.resolve({ data: { data: mockedUser } }));
    axios.get = mockedAxios;

    render(
      <WrapToRouterAndIntl>
        <LoadUser></LoadUser>
      </WrapToRouterAndIntl>
    );

    expect(mockedAxios).toHaveBeenCalled();
    await waitFor(
      () => {
        expect(useUserStore.getState().value.email).toEqual(mockedUser.email);
      },
      { timeout: 100 }
    );
  });
});
