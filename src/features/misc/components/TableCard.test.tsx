import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { expect, test, describe } from 'vitest';
import '@testing-library/jest-dom';

import { WrapToRouterAndIntl } from '../../../lib/tests.tsx';
import { ServiceContract } from '../../service-contract/types';

import { TableCard, QueryRequest, HeadersData } from './TableCard.tsx';

const mockEntities: ServiceContract[] = [
  {
    id: '15x322',
    contract_no: '222x111',
    subject: 'Some test subject',
    start_date: '2021-01-01',
    end_date: '2021-01-01',
    contract_status: 'In Progress',
    createdtime: '2021-01-01 00:00:00',
    modifiedtime: '2021-01-01 00:00:00',
    contract_type: 'Support',
    contract_priority: 'Low',
    sc_related_to: '16x2',
    tracking_unit: 'Hours',
    total_units: 10,
    used_units: 524,
    due_date: '2021-01-01 00:00:00',
    description: 'Some test description',
    planned_duration: 10,
    actual_duration: 5,
    progress: 50,
    assigned_user_id: '19x1',
    label: 'Some test label',
    source: 'Some test source',
    starred: false,
    tags: [],
  },
];

const mockHeaders: HeadersData<ServiceContract>[] = [
  { header: 'contract_no', md: 1, xs: 12, type: 'string' },
  { header: 'subject', md: 5, xs: 12, type: 'string' },
  { header: 'used_units', md: 2, xs: 12, type: 'string' },
  { header: 'end_date', md: 2, xs: 12, type: 'date' },
  { header: 'contract_status', md: 2, xs: 12, type: 'badge' },
];

const mockInitialQuery: QueryRequest = {
  page: 1,
  size: 10,
  search: '',
  sort: '',
};

describe('TableCard', () => {
  test('should display loading spinner while data is being fetched', () => {
    render(
      <WrapToRouterAndIntl>
        <TableCard
          entities={undefined}
          isLoading={true}
          module="service-contracts"
          initialQuery={mockInitialQuery}
          onChangeQuery={() => {}}
          route="some/route"
          moduleName="ServiceContracts"
          headers={mockHeaders}
          isEntityBold={() => false}
        />
      </WrapToRouterAndIntl>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('should display "No data" message if data is not available', () => {
    render(
      <WrapToRouterAndIntl>
        <TableCard
          entities={{ data: [], page: 1, count: 0, size: 10 }}
          isLoading={false}
          module="invoices"
          initialQuery={mockInitialQuery}
          onChangeQuery={() => {}}
          route="/app/invoices"
          moduleName="Invoices"
          headers={mockHeaders}
          isEntityBold={() => false}
        />
      </WrapToRouterAndIntl>
    );

    const message = screen.getByText('No data available');
    expect(message).toBeInTheDocument();
  });

  test('should render the table with correct data', () => {
    render(
      <WrapToRouterAndIntl>
        <HelmetProvider>
          <TableCard
            entities={{ data: mockEntities, page: 1, count: mockEntities.length, size: 10 }}
            isLoading={false}
            module="service-contracts"
            initialQuery={mockInitialQuery}
            onChangeQuery={() => {}}
            route="/app/service-contracts"
            moduleName="ServiceContracts"
            headers={mockHeaders}
            isEntityBold={() => false}
          />
        </HelmetProvider>
      </WrapToRouterAndIntl>
    );

    const table = screen.getByTestId('main-table');
    expect(table).toBeInTheDocument();

    const contractNo = screen.getByText('222x111');
    expect(contractNo).toBeInTheDocument();

    const subject = screen.getByText('Some test subject');
    expect(subject).toBeInTheDocument();

    const contractStatus = screen.getByText('In Progress');
    expect(contractStatus).toBeInTheDocument();

    const link = screen.getByText('524');
    expect(link).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(link.href).toEqual('/app/service-contracts/15x322');
  });
});
