import { render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { WrapToRouterAndIntl } from '../../../../lib/tests.tsx';
import { Company } from '../../types';

import { RequisitesRow } from './RequisitesRow.tsx';

describe('RequisitesRow', () => {
  test('renders the company parameter and value', () => {
    const company = {
      organizationname: 'Test Company',
      address: '123 Test Street',
      inn: '12345',
    } as unknown as Company;

    const param = 'organizationname';
    const view = render(
      <WrapToRouterAndIntl>
        <RequisitesRow company={company} param={param} />
      </WrapToRouterAndIntl>
    );

    const parameterText = screen.getByText('Company Name');
    const valueText = screen.getByText(company[param]);

    expect(parameterText).toBeInTheDocument();
    expect(valueText).toBeInTheDocument();
    view.unmount();
  });

  test('returns null when the company parameter is falsy', () => {
    const company = {
      organizationname: '',
      address: '123 Test Street',
      inn: '12345',
    } as unknown as Company;

    const param = 'organizationname';
    const view = render(
      <WrapToRouterAndIntl>
        <RequisitesRow company={company} param={param} />
      </WrapToRouterAndIntl>
    );

    expect(screen.queryByText('Company Name')).not.toBeInTheDocument();
    view.unmount();
  });
});
