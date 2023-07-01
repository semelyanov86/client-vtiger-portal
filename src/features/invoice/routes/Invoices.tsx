import { useState } from 'react';

import { DEFAULT_PATHS } from '../../../config';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { QueryRequest, TableCard } from '../../misc/components/TableCard.tsx';
import { useInvoices } from '../api/getInvoices.ts';

export const Invoices = () => {
  const [query, setQuery] = useState<QueryRequest>({
    page: 1,
    size: DEFAULT_PAGE_COUNT,
    search: '',
    sort: '-invoice_no',
  });
  const invoicesQuery = useInvoices(query);

  return (
    <TableCard
      entities={invoicesQuery.data}
      isLoading={invoicesQuery.isLoading}
      module="invoices"
      moduleName="Invoices"
      route={DEFAULT_PATHS.INVOICE}
      initialQuery={query}
      onChangeQuery={setQuery}
      headers={[
        { header: 'invoice_no', md: 1, xs: 12, type: 'string' },
        { header: 'subject', md: 5, xs: 12, type: 'string' },
        { header: 'hdnGrandTotal', md: 2, xs: 12, type: 'string' },
        { header: 'invoicedate', md: 2, xs: 12, type: 'date' },
        { header: 'invoicestatus', md: 2, xs: 12, type: 'badge' },
      ]}
      isEntityBold={(entity) => entity.invoicestatus === 'Created'}
    ></TableCard>
  );
};
