import { useState } from 'react';

import { DEFAULT_PATHS } from '../../../config';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { QueryRequest, TableCard } from '../../misc/components/TableCard.tsx';
import { useProjects } from '../api/getProjects.ts';

export const Projects = () => {
  const [query, setQuery] = useState<QueryRequest>({
    page: 1,
    size: DEFAULT_PAGE_COUNT,
    search: '',
    sort: '-project_no',
  });
  const projectsQuery = useProjects(query);

  return (
    <TableCard
      entities={projectsQuery.data}
      isLoading={projectsQuery.isLoading}
      module="projects"
      moduleName="Projects"
      route={DEFAULT_PATHS.PROJECT}
      initialQuery={query}
      onChangeQuery={setQuery}
      headers={[
        { header: 'project_no', md: 1, xs: 12, type: 'string' },
        { header: 'projectname', md: 5, xs: 12, type: 'string' },
        { header: 'startdate', md: 2, xs: 12, type: 'date' },
        { header: 'progress', md: 2, xs: 12, type: 'string' },
        { header: 'projectstatus', md: 2, xs: 12, type: 'badge' },
      ]}
      isEntityBold={(entity) =>
        entity.projectstatus == 'Выполняется' || entity.projectstatus == 'in progress'
      }
    ></TableCard>
  );
};
