import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { ForgotPasswordForm } from './ForgotPasswordForm.tsx';

describe('ForgotPasswordForm', () => {
  test('should render form correctly', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ForgotPasswordForm onSuccess={() => {}} />
      </WrapToRouterAndIntl>
    );
    const div = screen.getByTestId('forgot-password-form');
    expect(div).toBeInTheDocument();
    view.unmount();
  });
  test('should display error if email is not valid', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ForgotPasswordForm onSuccess={() => {}} />
      </WrapToRouterAndIntl>
    );
    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByTestId('submit-button');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    view.unmount();
  });
  test('should enable button if email is valid', async () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ForgotPasswordForm onSuccess={() => {}} />
      </WrapToRouterAndIntl>
    );
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const button = screen.getByTestId('submit-button');

    fireEvent.change(input, { target: { value: 'test@mail.ru' } });
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
    expect(input.name).toBe('email');
    expect(input.value).toBe('test@mail.ru');
    expect(button).toBeInTheDocument();
    await waitFor(
      () => {
        expect(button).toBeEnabled();
      },
      { timeout: 3 }
    );
    view.unmount();
  });
  test('should send request to server if email is valid', async () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.post = mockFn;
    const mockCallback = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <ForgotPasswordForm onSuccess={mockCallback} />
      </WrapToRouterAndIntl>
    );
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const button = screen.getByTestId('submit-button');

    fireEvent.change(input, { target: { value: 'test2@mail.ru' } });
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test2@mail.ru');
    expect(button).toBeInTheDocument();
    await waitFor(
      () => {
        expect(button).toBeEnabled();
      },
      { timeout: 3 }
    );
    fireEvent.click(button);
    await waitFor(
      () => {
        expect(mockFn).toBeCalledTimes(1);
      },
      { timeout: 100 }
    );
    await waitFor(
      () => {
        expect(mockFn).toBeCalledWith('/users/restore', { email: 'test2@mail.ru' });
      },
      { timeout: 150 }
    );
    await waitFor(
      () => {
        expect(mockCallback).toBeCalledTimes(1);
      },
      { timeout: 200 }
    );
    view.unmount();
  });
});
