import { Col, Button, Row, Card, Spinner } from 'react-bootstrap';
import { Pencil, Recycle, PencilSquare } from 'react-bootstrap-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { AllUsersWidget } from '../../auth/components/AllUsersWidget.tsx';
import { CompanyWidget } from '../../company/components/CompanyWidget.tsx';
import { ExtendKnowledge } from '../../faq/components/templates/ExtendKnowledge.tsx';
import { useStatistics } from '../../statistic/api/getStatistics.ts';
import { InvoiceStatistics } from '../../statistic/components/InvoiceStatistics.tsx';
import { TicketStatistics } from '../../statistic/components/TicketStatistics.tsx';

export const Home = () => {
  const title = 'Dashboard';
  const { formatMessage: f } = useIntl();
  const statisticQuery = useStatistics();

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'app', text: 'Dashboard' },
  ];

  return (
    <>
      <Head title={title} />

      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        <Row>
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">{title}</h1>
            <BreadcrumbList items={breadcrumbs} />
          </Col>
          {/* Title End */}
        </Row>
      </div>
      {/* Title and Top Buttons End */}

      <Row>
        <Col xl="6">
          <h2 className="small-title">{f({ id: 'latestRegistration' })}</h2>
          <AllUsersWidget></AllUsersWidget>
          {/* Stats Start */}
          <h2 className="small-title mt-3">Stats</h2>
          {statisticQuery.isLoading ? (
            <Spinner animation="border" variant="primary"></Spinner>
          ) : (
            <TicketStatistics stat={statisticQuery.data}></TicketStatistics>
          )}
          {/* Stats End */}
        </Col>

        {/* Products Start */}
        <Col xl="6" className="mb-5">
          <h2 className="small-title">Products</h2>
          <Card className="mb-2" id="introSecond">
            <Row className="g-0 sh-12">
              <Col xs="auto">
                <NavLink to="/pages/portfolio/detail">
                  <img
                    src="/img/product/small/product-1.webp"
                    alt="user"
                    className="card-img card-img-horizontal sw-13 sw-lg-15"
                  />
                </NavLink>
              </Col>
              <Col>
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                      <NavLink to="/pages/portfolio/detail">Kommissbrot</NavLink>
                      <div className="text-small text-muted text-truncate">
                        Icing liquorice olegário jujubes oat cake.
                      </div>
                    </Col>
                    <Col md="5" className="d-flex align-items-center justify-content-md-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <Pencil width={15} height={15}></Pencil>
                        <span className="d-none d-xxl-inline-block">Edit</span>
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <Recycle width={15} height={15} />
                        <span className="d-none d-xxl-inline-block">Delete</span>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Card className="mb-2">
            <Row className="g-0 sh-12">
              <Col xs="auto">
                <NavLink to="/pages/portfolio/detail">
                  <img
                    src="/img/product/small/product-2.webp"
                    alt="user"
                    className="card-img card-img-horizontal sw-13 sw-lg-15"
                  />
                </NavLink>
              </Col>
              <Col>
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                      <NavLink to="/pages/portfolio/detail">Yeast Karavai</NavLink>
                      <div className="text-small text-muted text-truncate">
                        Icing Gummi liquorice olegário jujubes cookie.
                      </div>
                    </Col>
                    <Col md="5" className="d-flex align-items-center justify-content-md-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <PencilSquare width={15} height={15} />
                        <span className="d-none d-xxl-inline-block">Edit</span>
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <Recycle width={15} height={15} />
                        <span className="d-none d-xxl-inline-block">Delete</span>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Card className="mb-2">
            <Row className="g-0 sh-12">
              <Col xs="auto">
                <NavLink to="/pages/portfolio/detail">
                  <img
                    src="/img/product/small/product-3.webp"
                    alt="user"
                    className="card-img card-img-horizontal sw-13 sw-lg-15"
                  />
                </NavLink>
              </Col>
              <Col>
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                      <NavLink to="/pages/portfolio/detail">Cholermüs</NavLink>
                      <div className="text-small text-muted text-truncate">
                        Marshmallow topping icing liquorice oat cake.
                      </div>
                    </Col>
                    <Col md="5" className="d-flex align-items-center justify-content-md-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <PencilSquare width={15} height={15} />
                        <span className="d-none d-xxl-inline-block">Edit</span>
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <Recycle width={15} height={15} />
                        <span className="d-none d-xxl-inline-block">Delete</span>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Card className="mb-2">
            <Row className="g-0 sh-12">
              <Col xs="auto">
                <NavLink to="/pages/portfolio/detail">
                  <img
                    src="/img/product/small/product-8.webp"
                    alt="user"
                    className="card-img card-img-horizontal sw-13 sw-lg-15"
                  />
                </NavLink>
              </Col>
              <Col>
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                      <NavLink to="/pages/portfolio/detail">Cheesymite Scroll</NavLink>
                      <div className="text-small text-muted text-truncate">
                        Tootsie brownie ice cream marshmallow topping.
                      </div>
                    </Col>
                    <Col md="5" className="d-flex align-items-center justify-content-md-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <PencilSquare width={15} height={15} className="me-xxl-2" />
                        <span className="d-none d-xxl-inline-block">Edit</span>
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <Recycle width="15" height="15" className="me-xxl-2" />
                        <span className="d-none d-xxl-inline-block">Delete</span>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Card className="mb-2">
            <Row className="g-0 sh-12">
              <Col xs="auto">
                <NavLink to="/pages/portfolio/detail">
                  <img
                    src="/img/product/small/product-9.webp"
                    alt="user"
                    className="card-img card-img-horizontal sw-13 sw-lg-15"
                  />
                </NavLink>
              </Col>
              <Col>
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                      <NavLink to="/pages/portfolio/detail">Bazlama</NavLink>
                      <div className="text-small text-muted text-truncate">
                        Tootsie roll cream marshmallow chocolate bar.
                      </div>
                    </Col>
                    <Col md="5" className="d-flex align-items-center justify-content-md-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <PencilSquare width="15" height="15" className="me-xxl-2" />
                        <span className="d-none d-xxl-inline-block">Edit</span>
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <Recycle width="15" height="15" className="me-xxl-2" />
                        <span className="d-none d-xxl-inline-block">Delete</span>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row className="g-0 sh-12">
              <Col xs="auto">
                <NavLink to="/pages/portfolio/detail">
                  <img
                    src="/img/product/small/product-10.webp"
                    alt="user"
                    className="card-img card-img-horizontal sw-13 sw-lg-15"
                  />
                </NavLink>
              </Col>
              <Col>
                <Card.Body className="pt-0 pb-0 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                      <NavLink to="/pages/portfolio/detail">Soda Bread</NavLink>
                      <div className="text-small text-muted text-truncate">
                        Marshmallow topping icing liquorice oat cake.
                      </div>
                    </Col>
                    <Col md="5" className="d-flex align-items-center justify-content-md-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <PencilSquare width="15" height="15" className="me-xxl-2" />
                        <span className="d-none d-xxl-inline-block">Edit</span>
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="btn-icon btn-icon-start ms-1"
                      >
                        <Recycle width="15" height="15" className="me-xxl-2" />
                        <span className="d-none d-xxl-inline-block">Delete</span>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
        {/* Products End */}
      </Row>

      <Row>
        {/* Tasks Start */}
        <Col lg="6" className="mb-5">
          <h2 className="small-title">Project Tasks</h2>
          <Card className="h-100-card">
            <Card.Body className="mb-n2 h-100">
              <div className="mb-2">
                <label className="form-check w-100 checked-line-through checked-opacity-75">
                  <input type="checkbox" className="form-check-input" defaultChecked />
                  <span className="form-check-label d-block">
                    <span>Create Wireframes</span>
                    <span className="text-muted d-block text-small mt-0">Today 09:00</span>
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label className="form-check w-100 checked-line-through checked-opacity-75">
                  <input type="checkbox" className="form-check-input" defaultChecked />
                  <span className="form-check-label d-block">
                    <span>Meeting with the team</span>
                    <span className="text-muted d-block text-small mt-0">Today 13:00</span>
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label className="form-check w-100 checked-line-through checked-opacity-75">
                  <input type="checkbox" className="form-check-input" defaultChecked />
                  <span className="form-check-label d-block">
                    <span>Business lunch with clients</span>
                    <span className="text-muted d-block text-small mt-0">Today 14:00</span>
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label className="form-check w-100 checked-line-through checked-opacity-75">
                  <input type="checkbox" className="form-check-input" defaultChecked />
                  <span className="form-check-label d-block">
                    <span>Training with the team</span>
                    <span className="text-muted d-block text-small mt-0">Today 15:00</span>
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label className="form-check w-100 checked-line-through checked-opacity-75">
                  <input type="checkbox" className="form-check-input" />
                  <span className="form-check-label d-block">
                    <span>Account meeting</span>
                    <span className="text-muted d-block text-small mt-0">Today 17:00</span>
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label className="form-check w-100 checked-line-through checked-opacity-75">
                  <input type="checkbox" className="form-check-input" />
                  <span className="form-check-label d-block">
                    <span>Gym</span>
                    <span className="text-muted d-block text-small mt-0">Today 17:30</span>
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label className="form-check w-100 checked-line-through checked-opacity-75">
                  <input type="checkbox" className="form-check-input" />
                  <span className="form-check-label d-block">
                    <span>Dinner with the family</span>
                    <span className="text-muted d-block text-small mt-0">Today 19:30</span>
                  </span>
                </label>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* Tasks End */}

        {/* Invoice Statistics */}
        <Col lg="6" className="mb-5">
          <h2 className="small-title">Invoice Statistics</h2>
          {statisticQuery.isLoading ? (
            <Spinner animation="border" variant="primary"></Spinner>
          ) : (
            <InvoiceStatistics stat={statisticQuery.data}></InvoiceStatistics>
          )}
          <CompanyWidget></CompanyWidget>
        </Col>
        {/* Categories End */}
      </Row>

      {/* Extend Your Knowledge Start */}
      <Row>
        <h2 className="small-title">
          <FormattedMessage id="faq.extend-knowledge"></FormattedMessage>
        </h2>
        <ExtendKnowledge></ExtendKnowledge>
      </Row>
      {/* Extend Your Knowledge End */}
    </>
  );
};
