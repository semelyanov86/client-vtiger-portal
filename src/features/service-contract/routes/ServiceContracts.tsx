import { useState } from 'react';

import { DEFAULT_PATHS } from '../../../config';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { QueryRequest, TableCard } from '../../misc/components/TableCard.tsx';
import { useServiceContracts } from '../api/getServiceContracts.ts';

export const ServiceContracts = () => {
  const [query, setQuery] = useState<QueryRequest>({
    page: 1,
    size: DEFAULT_PAGE_COUNT,
    search: '',
    sort: '-contract_no',
  });
  const serviceContractsQuery = useServiceContracts(query);

  return (
    <TableCard
      entities={serviceContractsQuery.data}
      isLoading={serviceContractsQuery.isLoading}
      module="service-contracts"
      moduleName="ServiceContracts"
      route={DEFAULT_PATHS.SERVICE_CONTRACT}
      initialQuery={query}
      onChangeQuery={setQuery}
      headers={[
        { header: 'contract_no', md: 1, xs: 12, type: 'string' },
        { header: 'subject', md: 5, xs: 12, type: 'string' },
        { header: 'start_date', md: 2, xs: 12, type: 'date' },
        { header: 'end_date', md: 2, xs: 12, type: 'date' },
        { header: 'contract_status', md: 2, xs: 12, type: 'badge' },
      ]}
      isEntityBold={(entity) => entity.contract_status === 'In Progress'}
    ></TableCard>
  );
};
