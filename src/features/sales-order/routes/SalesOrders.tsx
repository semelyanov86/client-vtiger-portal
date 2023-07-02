import { useState } from 'react';

import { DEFAULT_PATHS } from '../../../config';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { QueryRequest, TableCard } from '../../misc/components/TableCard.tsx';
import { useSalesOrders } from '../api/getSalesOrders.ts';

export const SalesOrders = () => {
  const [query, setQuery] = useState<QueryRequest>({
    page: 1,
    size: DEFAULT_PAGE_COUNT,
    search: '',
    sort: '-salesorder_no',
  });
  const salesOrderQuery = useSalesOrders(query);

  return (
    <TableCard
      entities={salesOrderQuery.data}
      isLoading={salesOrderQuery.isLoading}
      module="sales-orders"
      moduleName="Sales Orders"
      route={DEFAULT_PATHS.SALES_ORDER}
      initialQuery={query}
      onChangeQuery={setQuery}
      headers={[
        { header: 'salesorder_no', md: 1, xs: 12, type: 'string' },
        { header: 'subject', md: 5, xs: 12, type: 'string' },
        { header: 'hdnGrandTotal', md: 2, xs: 12, type: 'string' },
        { header: 'createdtime', md: 2, xs: 12, type: 'date' },
        { header: 'sostatus', md: 2, xs: 12, type: 'badge' },
      ]}
      isEntityBold={(entity) => entity.sostatus == 'Created'}
    ></TableCard>
  );
};
