import { fireEvent, render, screen } from '@testing-library/react';
import { FieldErrors } from 'react-hook-form';
import { expect, test, describe, vi } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../../lib/tests.tsx';
import { Module } from '../../../module/types';

import { DateField } from './DateField.tsx';

describe('DateField', () => {
  test('should render the label and date picker', () => {
    const module = { name: 'Assets' } as Module;
    const field = 'datesold';
    const registerMock = vi.fn();
    const errors = {};
    const onChangeMock = vi.fn();
    const value = '2022.06.01';

    render(
      <WrapToRouterAndIntl>
        <DateField
          module={module}
          field={field}
          register={registerMock}
          errors={errors}
          onChange={onChangeMock}
          value={value}
        />
      </WrapToRouterAndIntl>
    );

    const label = screen.getByText('Date Sold');
    const datePicker = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
    expect(datePicker).toHaveValue(value);
  });
  test('triggers onChange event and updates date on date selection', () => {
    const module = { name: 'Assets' } as Module;
    const field = 'datesold';
    const registerMock = vi.fn();
    const errors = {};
    const onChangeMock = vi.fn();
    const value = '2022.06.01';

    render(
      <WrapToRouterAndIntl>
        <DateField
          module={module}
          field={field}
          register={registerMock}
          errors={errors}
          onChange={onChangeMock}
          value={value}
        />
      </WrapToRouterAndIntl>
    );

    const datePicker = screen.getByRole('textbox');

    fireEvent.change(datePicker, { target: { value: '2022.06.15' } });

    expect(onChangeMock).toHaveBeenCalledWith(field, '2022-06-15');
    expect(datePicker).toHaveValue('2022.06.15');
  });

  test('displays error message when there is an error', async () => {
    const module = { name: 'Assets' } as Module;
    const field = 'datesold';
    const registerMock = vi.fn();
    const errors = { datesold: { message: 'Invalid date' } } as unknown as FieldErrors;
    const onChangeMock = vi.fn();

    render(
      <WrapToRouterAndIntl>
        <DateField
          module={module}
          field={field}
          register={registerMock}
          errors={errors}
          onChange={onChangeMock}
        />
      </WrapToRouterAndIntl>
    );

    const errorTooltip = screen.getByText('Invalid date');

    expect(errorTooltip).toBeInTheDocument();
  });
});
