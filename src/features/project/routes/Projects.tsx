import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Row, Col, Form, Card, Badge } from 'react-bootstrap';
import { Search, XCircle } from 'react-bootstrap-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { Spinner } from '../../../components/Elements';
import { ListPageTitle } from '../../../components/Elements/ListPage/ListPageTitle.tsx';
import { Head } from '../../../components/Head';
import { ControlsPageSize } from '../../../components/Table/ControlsPageSize.tsx';
import { TablePagination } from '../../../components/Table/TablePagination.tsx';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { getSortingValue } from '../../../utils/sorting.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { useProjects } from '../api/getProjects.ts';

const HEADER_CONTENT_CLASSES = ['d-flex', 'flex-column', 'pe-1', 'justify-content-center'];

const ROW_TABLE_CLASSES = ['d-flex', 'flex-column', 'justify-content-center', 'mb-2', 'mb-md-0'];

const ROW_TABLE_FIELD_CLASSES = ['text-muted', 'text-small', 'd-md-none'];

export const Projects = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'project.list' });
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_COUNT);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [sort, setSort] = useState('-project_no');

  const query = {
    page: page,
    size: currentPageSize,
    search: searchFilter,
    sort: sort,
  };
  const projectsQuery = useProjects(query);

  const onChangePage = useCallback(
    (pageIndex: number) => {
      setPage(pageIndex);
    },
    // eslint-disable-next-line
    [page]
  );

  useMemo(() => {
    if (!projectsQuery.data) {
      return;
    }
    setPageCount(Math.ceil(projectsQuery.data.count / projectsQuery.data.size));
  }, [projectsQuery.data]);

  const headerClasses = useCallback(
    (column: string) => {
      return classNames('text-muted text-small cursor-pointer sort', {
        asc: column == sort,
        desc: '-' + column == sort,
      });
    },
    [sort]
  );

  const onSelectPageSize = useCallback(
    (size: number) => {
      setCurrentPageSize(size);
    },
    [setCurrentPageSize]
  );

  if (projectsQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!projectsQuery.data) {
    return <FormattedMessage id="general.no-data"></FormattedMessage>;
  }

  return (
    <>
      <Head title={title} />

      <Col>
        <ListPageTitle title={title} breadcrumb={{ to: 'app/projects', text: 'Projects' }}>
          <></>
        </ListPageTitle>

        <Row className="mb-3">
          <Col md="5" lg="3" xxl="2" className="mb-1">
            {/* Search Start */}
            <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                }}
                /* eslint-disable-next-line jsx-a11y/no-autofocus */
                autoFocus={true}
              />
              <span className="search-magnifier-icon">
                <Search></Search>
              </span>
              <span className="search-delete-icon d-none">
                <XCircle></XCircle>
              </span>
            </div>
            {/* Search End */}
          </Col>
          <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
            {/* Length Start */}
            <ControlsPageSize onSelectPageSize={onSelectPageSize} pageSize={currentPageSize} />
            {/* Length End */}
          </Col>
        </Row>

        <div className="mb-5">
          {/* List Header Start */}
          <Row className="g-0 h-100 align-content-center d-none d-md-flex ps-5 pe-5 mb-2 custom-sort">
            <Col
              md="1"
              className="d-flex flex-column mb-lg-0 pe-3 d-flex"
              onClick={() => setSort(getSortingValue('project_no', sort))}
            >
              <div className={headerClasses('project_no')}>
                <FormattedMessage id="project.project_no"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="6"
              className={classNames(...HEADER_CONTENT_CLASSES)}
              onClick={() => setSort(getSortingValue('projectname', sort))}
            >
              <div className={headerClasses('projectname')}>
                <FormattedMessage id="project.projectname"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="3"
              className={classNames(...HEADER_CONTENT_CLASSES)}
              onClick={() => setSort(getSortingValue('startdate', sort))}
            >
              <div className={headerClasses('startdate')}>
                <FormattedMessage id="project.startdate"></FormattedMessage>
              </div>
            </Col>
            <Col
              md="2"
              className={classNames(...HEADER_CONTENT_CLASSES, 'text-end')}
              onClick={() => setSort(getSortingValue('projectstatus', sort))}
            >
              <div className={headerClasses('projectstatus')}>
                <FormattedMessage id="project.projectstatus"></FormattedMessage>
              </div>
            </Col>
          </Row>
          {/* List Header End */}

          {/* List Items Start */}
          {projectsQuery.data.data.map((project) => {
            return (
              <Card key={project.id} className="hover-border-primary mb-2">
                <Card.Body className="pt-0 pb-0 sh-22 sh-md-7">
                  <Row className="g-0 h-100 align-content-center cursor-default">
                    <Col
                      xs="6"
                      md="1"
                      className={classNames(
                        ...ROW_TABLE_CLASSES,
                        'order-1',
                        'order-md-1',
                        'h-md-100'
                      )}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="project.project_no"></FormattedMessage>
                      </div>
                      <NavLink
                        to={'/app/projects/' + project.id}
                        className={classNames(
                          'stretched-link h-100 d-flex body-link align-items-center',
                          {
                            'fw-bold': project.projectstatus == 'Выполняется',
                          }
                        )}
                      >
                        {project.project_no}
                      </NavLink>
                    </Col>
                    <Col
                      xs="12"
                      md="6"
                      className={classNames(...ROW_TABLE_CLASSES, 'order-3', 'order-md-2')}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="project.projectname"></FormattedMessage>
                      </div>
                      <div
                        className={classNames('text-body', {
                          'fw-bold': project.projectstatus == 'Выполняется',
                        })}
                      >
                        {project.projectname}
                      </div>
                    </Col>
                    <Col
                      xs="12"
                      md="3"
                      className={classNames(...ROW_TABLE_CLASSES, 'order-4', 'order-md-3')}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="project.startdate"></FormattedMessage>
                      </div>
                      <div className="text-body">{formatToUserReadableDate(project.startdate)}</div>
                    </Col>
                    <Col
                      xs="6"
                      md="2"
                      className={classNames(
                        ...ROW_TABLE_CLASSES,
                        'order-2',
                        'order-md-5',
                        'align-items-md-end'
                      )}
                    >
                      <div className={classNames(...ROW_TABLE_FIELD_CLASSES)}>
                        <FormattedMessage id="project.projectstatus"></FormattedMessage>
                      </div>
                      <div>
                        <Badge bg="outline-primary">
                          <FormattedMessage id={'project.' + project.projectstatus} />
                        </Badge>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}

          {/* List Items End */}
        </div>
        {/* Pagination Start */}
        <div className="d-flex justify-content-center">
          <TablePagination
            page={page}
            pageCount={pageCount}
            gotoPage={onChangePage}
          ></TablePagination>
        </div>
        {/* Pagination End */}
      </Col>
    </>
  );
};
