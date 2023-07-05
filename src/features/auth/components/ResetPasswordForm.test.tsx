import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { axios } from '../../../lib/axios.ts';
import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';

import { ResetPasswordForm } from './ResetPasswordForm.tsx';

describe('ResetPasswordForm', () => {
  test('should display component with no errors', () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ResetPasswordForm onSuccess={() => {}} token="testtoken"></ResetPasswordForm>
      </WrapToRouterAndIntl>
    );
    const page = screen.getByTestId('reset-password-page');
    expect(page).toBeInTheDocument();

    const btn = screen.getByTestId('reset-password-button');
    expect(btn).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');

    const confirmPasswordInput = screen.getByPlaceholderText('Verify Password') as HTMLInputElement;
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput.type).toBe('password');

    view.unmount();
  });
  test('should display component with errors', async () => {
    const view = render(
      <WrapToRouterAndIntl>
        <ResetPasswordForm onSuccess={() => {}} token="testtoken"></ResetPasswordForm>
      </WrapToRouterAndIntl>
    );

    const btn = screen.getByTestId('reset-password-button');
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    await waitFor(
      () => {
        expect(screen.getByText('Required')).toBeInTheDocument();
      },
      { timeout: 100 }
    );

    view.unmount();
  });
  test('should validate passwords match', async () => {
    const onSuccess = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <ResetPasswordForm onSuccess={onSuccess} token="testtoken"></ResetPasswordForm>
      </WrapToRouterAndIntl>
    );

    const btn = screen.getByTestId('reset-password-button');
    expect(btn).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();

    const confirmPasswordInput = screen.getByPlaceholderText('Verify Password') as HTMLInputElement;
    expect(confirmPasswordInput).toBeInTheDocument();

    fireEvent.input(passwordInput, { target: { value: 'testPass123' } });
    fireEvent.input(confirmPasswordInput, { target: { value: 'testPass1234' } });

    fireEvent.click(btn);

    await waitFor(
      () => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      },
      { timeout: 100 }
    );
    await waitFor(
      () => {
        expect(onSuccess).not.toHaveBeenCalled();
      },
      { timeout: 100 }
    );

    view.unmount();
  });
  test('should send form data', async () => {
    const mockFn = vi.fn().mockReturnValue(Promise.resolve({ data: {} }));
    axios.put = mockFn;
    const onSuccess = vi.fn();
    const view = render(
      <WrapToRouterAndIntl>
        <ResetPasswordForm onSuccess={onSuccess} token="testtoken"></ResetPasswordForm>
      </WrapToRouterAndIntl>
    );
    const btn = screen.getByTestId('reset-password-button');
    expect(btn).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(passwordInput).toBeInTheDocument();

    const confirmPasswordInput = screen.getByPlaceholderText('Verify Password') as HTMLInputElement;
    expect(confirmPasswordInput).toBeInTheDocument();

    fireEvent.input(passwordInput, { target: { value: 'testPass123' } });
    fireEvent.input(confirmPasswordInput, { target: { value: 'testPass123' } });

    fireEvent.click(btn);

    await waitFor(
      () => {
        expect(mockFn).toHaveBeenCalled();
      },
      { timeout: 100 }
    );
    await waitFor(
      () => {
        expect(mockFn).toHaveBeenCalledWith('/users/password', {
          password: 'testPass123',
          token: 'testtoken',
        });
      },
      { timeout: 80 }
    );
    await waitFor(
      () => {
        expect(onSuccess).toHaveBeenCalled();
      },
      { timeout: 200 }
    );

    view.unmount();
  });
});
