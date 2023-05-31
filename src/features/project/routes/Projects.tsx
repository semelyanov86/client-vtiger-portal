import { useState } from 'react';
import {
  Row,
  Col,
  Dropdown,
  OverlayTrigger,
  Form,
  Tooltip,
  Card,
  Badge,
  Pagination,
} from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Download, Search, XCircle } from 'react-bootstrap-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { Spinner } from '../../../components/Elements';
import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { DEFAULT_PAGE_COUNT } from '../../../config/constants.ts';
import { useProjects } from '../api/getProjects.ts';

export const Projects = () => {
  const { formatMessage: f } = useIntl();
  const title = f({ id: 'project.list' });
  const [currentPageSize, _] = useState(DEFAULT_PAGE_COUNT);
  const query = {
    page: 1,
    size: currentPageSize,
    search: '',
    sort: 'id',
  };
  const projectsQuery = useProjects(query);
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '/app/projects', text: 'Projects' },
  ];

  if (projectsQuery.isLoading) {
    return <Spinner></Spinner>;
  }

  if (!projectsQuery.data) {
    return <p>No projects available</p>;
  }

  return (
    <>
      <Head title={title} />

      <Col>
        {/* Title Start */}
        <div className="page-title-container mb-3">
          <Row>
            <Col className="mb-2">
              <h1 className="mb-2 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </Col>
            <Col xs="12" sm="auto" className="d-flex align-items-center justify-content-end"></Col>
          </Row>
        </div>
        {/* Title End */}

        <Row className="mb-3">
          <Col md="5" lg="3" xxl="2" className="mb-1">
            {/* Search Start */}
            <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
              <Form.Control type="text" placeholder="Search" />
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
            {/* Export Dropdown Start */}
            <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
              <OverlayTrigger
                delay={{ show: 1000, hide: 0 }}
                placement="top"
                overlay={<Tooltip id="tooltip-top">Export</Tooltip>}
              >
                <Dropdown.Toggle
                  variant="foreground-alternate"
                  className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow"
                >
                  <Download></Download>
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu className="shadow dropdown-menu-end">
                <Dropdown.Item href="#">Copy</Dropdown.Item>
                <Dropdown.Item href="#">Excel</Dropdown.Item>
                <Dropdown.Item href="#">Cvs</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* Export Dropdown End */}

            {/* Length Start */}
            <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
              <OverlayTrigger
                delay={{ show: 1000, hide: 0 }}
                placement="top"
                overlay={<Tooltip id="tooltip-top">Item Count</Tooltip>}
              >
                <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-13">
                  10 Items
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu className="shadow dropdown-menu-end">
                <Dropdown.Item href="#">5 Items</Dropdown.Item>
                <Dropdown.Item href="#">10 Items</Dropdown.Item>
                <Dropdown.Item href="#">20 Items</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* Length End */}
          </Col>
        </Row>

        <div className="mb-5">
          {/* List Header Start */}
          <Row className="g-0 h-100 align-content-center d-none d-md-flex ps-5 pe-5 mb-2 custom-sort">
            <Col md="1" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-small cursor-pointer sort">
                <FormattedMessage id="project.project_no"></FormattedMessage>
              </div>
            </Col>
            <Col md="6" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-small cursor-pointer sort">
                <FormattedMessage id="project.projectname"></FormattedMessage>
              </div>
            </Col>
            <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-small cursor-pointer sort">
                <FormattedMessage id="project.startdate"></FormattedMessage>
              </div>
            </Col>
            <Col md="2" className="d-flex flex-column pe-1 justify-content-end text-end">
              <div className="text-muted text-small cursor-pointer sort">
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
                      className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 "
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="project.project_no"></FormattedMessage>
                      </div>
                      <NavLink
                        to={'/app/projects/' + project.id}
                        className="stretched-link h-100 d-flex body-link align-items-center fw-bold"
                      >
                        {project.project_no}
                      </NavLink>
                    </Col>
                    <Col
                      xs="12"
                      md="6"
                      className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="project.projectname"></FormattedMessage>
                      </div>
                      <div className="text-body fw-bold">{project.projectname}</div>
                    </Col>
                    <Col
                      xs="12"
                      md="3"
                      className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="project.startdate"></FormattedMessage>
                      </div>
                      <div className="text-body fw-bold">{project.startdate}</div>
                    </Col>
                    <Col
                      xs="6"
                      md="2"
                      className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 order-md-5"
                    >
                      <div className="text-muted text-small d-md-none">
                        <FormattedMessage id="project.projectstatus"></FormattedMessage>
                      </div>
                      <div>
                        <Badge bg="outline-primary">{project.projectstatus}</Badge>
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
          <Pagination>
            <Pagination.Prev className="shadow" disabled>
              <ChevronLeft></ChevronLeft>
            </Pagination.Prev>
            <Pagination.Item className="shadow" active>
              1
            </Pagination.Item>
            <Pagination.Item className="shadow">2</Pagination.Item>
            <Pagination.Item className="shadow">3</Pagination.Item>
            <Pagination.Next className="shadow">
              <ChevronRight></ChevronRight>
            </Pagination.Next>
          </Pagination>
        </div>
        {/* Pagination End */}
      </Col>
    </>
  );
};
