import { Col, Button, Row, Card, Spinner } from 'react-bootstrap';
import {
  Pencil,
  Recycle,
  PencilSquare,
  ArrowBarRight,
  ChevronBarRight,
  ThreeDotsVertical,
} from 'react-bootstrap-icons';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Head } from '../../../components/Head';
import { CompanyWidget } from '../../company/components/CompanyWidget.tsx';
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
          <Card className="h-50-card mb-n2">
            <Card.Body>
              <Row className="g-0 sh-10 sh-sm-7 mb-2">
                <Col xs="auto">
                  <img
                    src="/img/profile/profile-1.webp"
                    className="card-img rounded-xl sh-6 sw-6"
                    alt="thumb"
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column flex-sm-row ps-4 h-100 align-items-sm-center justify-content-sm-between">
                    <div className="d-flex flex-column mb-2 mb-sm-0">
                      <div>Joisse Kaycee</div>
                      <div className="text-small text-muted">UX Designer</div>
                    </div>
                    <div className="d-flex">
                      <Button variant="outline-secondary ms-1" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="btn-icon btn-icon-only ms-1"
                      >
                        <ThreeDotsVertical></ThreeDotsVertical>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-0 sh-10 sh-sm-7 mb-2">
                <Col xs="auto">
                  <img
                    src="/img/profile/profile-2.webp"
                    className="card-img rounded-xl sh-6 sw-6"
                    alt="thumb"
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column flex-sm-row ps-4 h-100 align-items-sm-center justify-content-sm-between">
                    <div className="d-flex flex-column mb-2 mb-sm-0">
                      <div>Zayn Hartley</div>
                      <div className="text-small text-muted">Frontend Developer</div>
                    </div>
                    <div className="d-flex">
                      <Button variant="outline-secondary ms-1" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="btn-icon btn-icon-only ms-1"
                      >
                        <ThreeDotsVertical></ThreeDotsVertical>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-0 sh-10 sh-sm-7 mb-2">
                <Col xs="auto">
                  <img
                    src="/img/profile/profile-3.webp"
                    className="card-img rounded-xl sh-6 sw-6"
                    alt="thumb"
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column flex-sm-row ps-4 h-100 align-items-sm-center justify-content-sm-between">
                    <div className="d-flex flex-column mb-2 mb-sm-0">
                      <div>Esperanza Lodge</div>
                      <div className="text-small text-muted">Project Manager</div>
                    </div>
                    <div className="d-flex">
                      <Button variant="outline-secondary ms-1" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="btn-icon btn-icon-only ms-1"
                      >
                        <ThreeDotsVertical></ThreeDotsVertical>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-0 sh-10 sh-sm-7 mb-2">
                <Col xs="auto">
                  <img
                    src="/img/profile/profile-4.webp"
                    className="card-img rounded-xl sh-6 sw-6"
                    alt="thumb"
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column flex-sm-row ps-4 h-100 align-items-sm-center justify-content-sm-between">
                    <div className="d-flex flex-column mb-2 mb-sm-0">
                      <div>Kathryn Mengel</div>
                      <div className="text-small text-muted">Executive Team Leader</div>
                    </div>
                    <div className="d-flex">
                      <Button variant="outline-secondary ms-1" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="btn-icon btn-icon-only ms-1"
                      >
                        <ThreeDotsVertical></ThreeDotsVertical>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-0 sh-10 sh-sm-7 mb-2">
                <Col xs="auto">
                  <img
                    src="/img/profile/profile-5.webp"
                    className="card-img rounded-xl sh-6 sw-6"
                    alt="thumb"
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column flex-sm-row ps-4 h-100 align-items-sm-center justify-content-sm-between">
                    <div className="d-flex flex-column mb-2 mb-sm-0">
                      <div>Luna Wigglebutt</div>
                      <div className="text-small text-muted">Security Chief</div>
                    </div>
                    <div className="d-flex">
                      <Button variant="outline-secondary ms-1" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="btn-icon btn-icon-only ms-1"
                      >
                        <ThreeDotsVertical></ThreeDotsVertical>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

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
        <h2 className="small-title">Extend Your Knowledge</h2>
        <Col md="4" className="mb-5">
          <Card className="w-100 sh-20 sh-md-22 hover-img-scale-up">
            <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
              <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                <div className="cta-3 text-black">
                  Introduction
                  <br />
                  to Bread Making
                </div>
                <Button variant="primary" className="btn-icon btn-icon-start mt-3 stretched-link">
                  <ArrowBarRight /> <span>View</span>
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col md="4" className="mb-5">
          <Card className="w-100 sh-20 sh-md-22 hover-img-scale-up">
            <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
              <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                <div className="cta-3 text-black">
                  Basic Principles
                  <br />
                  of Cooking
                </div>
                <Button variant="primary" className="btn-icon btn-icon-start mt-3 stretched-link">
                  <ChevronBarRight /> <span>View</span>
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col md="4" className="mb-5">
          <Card className="w-100 sh-20 sh-md-22 hover-img-scale-up">
            <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
              <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                <div className="cta-3 text-black">
                  Easy & Practical
                  <br />
                  Recipes
                </div>
                <Button variant="primary" className="btn-icon btn-icon-start mt-3 stretched-link">
                  <ChevronBarRight /> <span>View</span>
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      {/* Extend Your Knowledge End */}
    </>
  );
};
