import { useCallback, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router';
import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table';

import { ListPageTitle } from '../../../components/Elements/ListPage/ListPageTitle.tsx';
import { Head } from '../../../components/Head';
import { NotifyError } from '../../../components/Notifications/Notification.tsx';
import { ButtonsAddNew } from '../../../components/Table/ButtonsAddNew.tsx';
import { ControlsAdd } from '../../../components/Table/ControlsAdd.tsx';
import { ControlsEdit } from '../../../components/Table/ControlsEdit.tsx';
import { ControlsPageSize } from '../../../components/Table/ControlsPageSize.tsx';
import { ControlsSearch } from '../../../components/Table/ControlsSearch.tsx';
import { Table } from '../../../components/Table/Table.tsx';
import { TablePagination } from '../../../components/Table/TablePagination.tsx';
import { CUSTOM_MODULES } from '../../../config';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { convertSortingToSort } from '../../../lib/requests.ts';
import { LoadCustomModule } from '../../module/LoadCustomModule.tsx';
import useModulesStore from '../../module/stores/module.ts';
import { useEntities } from '../api/getEntities.ts';
import { AddEditEntityModal } from '../components/AddEditEntityModal.tsx';
import { getModuleColumns } from '../table/getModuleColumns.tsx';
import { CustomModule } from '../types';

export const Entities = () => {
  const { moduleName } = useParams();
  useModulesStore();
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'entities.list' });
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_COUNT);

  const [editEntityId, setEditEntityId] = useState('');
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const onEditClick = (id: string) => {
    setEditEntityId(id);
    setIsOpenAddEditModal(true);
  };

  const columns: Column<CustomModule>[] = getModuleColumns({
    onEdit: onEditClick,
    module: moduleName ?? '',
  });

  const [pageCount, setPageCount] = useState(0);
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const moduleConfig = CUSTOM_MODULES[moduleName ?? ''];
  const [sort, setSort] = useState({ id: moduleConfig.default_sort, desc: true });

  const query = {
    page: page,
    size: currentPageSize,
    search: term,
    sort: convertSortingToSort(sort),
  };

  const { data, error, isLoading } = useEntities(query, moduleName ?? '');

  const entities = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    setPageCount(Math.ceil(data.count / data.size));
    return data.data;
  }, [data, currentPageSize, page, sort]);

  if (isLoading) {
    document.body.classList.add('spinner');
  } else {
    document.body.classList.remove('spinner');
  }

  if (error) {
    NotifyError(error.message);
  }

  const tableInstance = useTable(
    {
      columns,
      data: entities ?? [],
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetHiddenColumns: false,
      autoResetSelectedRows: false,
      pageCount,
      initialState: {
        pageIndex: 0,
        sortBy: [sort],
        hiddenColumns: ['description'],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );

  const { setPageSize, gotoPage, state, toggleAllPageRowsSelected } = tableInstance;

  useMemo(() => {
    const sorting = state.sortBy[0];
    if (sorting) {
      setSort({
        id: sorting.id,
        desc: sorting.desc ?? false,
      });
    }
  }, [state.sortBy]);

  const onChangePage = (pageIndex: number) => {
    gotoPage(pageIndex);
    setPage(pageIndex);
  };

  const searchItem = (val: string) => {
    if (!val) {
      setTerm('');
    }
    if (val.length > 3) {
      setTerm(val || '');
    }
  };

  const onSelectPageSize = useCallback(
    (size: number) => {
      setPageSize(size);
      setCurrentPageSize(size);
    },
    [setPageSize]
  );

  const addButtonClick = () => {
    toggleAllPageRowsSelected(false);
    setEditEntityId('');
    setIsOpenAddEditModal(true);
  };

  if (!moduleName) {
    return <FormattedMessage id="general.no-data"></FormattedMessage>;
  }

  if (!moduleConfig) {
    return <FormattedMessage id="general.not-supported"></FormattedMessage>;
  }

  return (
    <>
      <Head title={title} />
      <LoadCustomModule moduleName={moduleName}></LoadCustomModule>
      <Row>
        <Col>
          <ListPageTitle title={title} breadcrumb={{ to: 'app/' + moduleName, text: moduleName }}>
            <>
              {moduleConfig.edit_fields.length > 0 && <ButtonsAddNew onClick={addButtonClick} />}{' '}
            </>
          </ListPageTitle>

          <div>
            <Row className="mb-3">
              <Col sm="12" md="5" lg="3" xxl="2">
                <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                  <ControlsSearch<CustomModule>
                    tableInstance={tableInstance}
                    onChange={searchItem}
                  />
                </div>
              </Col>
              <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                  {moduleConfig.edit_fields.length > 0 && (
                    <>
                      {' '}
                      <ControlsAdd<CustomModule> tableInstance={tableInstance} />{' '}
                      <ControlsEdit<CustomModule> tableInstance={tableInstance} />{' '}
                    </>
                  )}
                </div>
                <div className="d-inline-block">
                  <ControlsPageSize
                    onSelectPageSize={onSelectPageSize}
                    pageSize={currentPageSize}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Table<CustomModule> className="react-table rows" tableInstance={tableInstance} />
              </Col>
              <Col xs="12">
                <TablePagination page={page} pageCount={pageCount} gotoPage={onChangePage} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <AddEditEntityModal
        isModalOpen={isOpenAddEditModal}
        onHide={() => {
          setIsOpenAddEditModal(false);
          setEditEntityId('');
        }}
        query={query}
        moduleName={moduleName}
        id={editEntityId}
      ></AddEditEntityModal>
    </>
  );
};
