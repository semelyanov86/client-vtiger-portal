import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Col, Button, Row, Card } from 'react-bootstrap';
import {
  Alarm,
  Compass,
  CheckCircle,
  ArrowBarLeft,
  Hexagon,
  Pin,
  Pencil,
  Recycle,
  PencilSquare,
  Circle,
  Square,
  Triangle,
  Cup,
  Magic,
  Tree,
  Fan,
  Scissors,
  Water,
  ArrowBarRight,
  ChevronBarRight,
} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { BreadcrumbList } from '../../../components/Elements/Breadcrumbs/BreadcrumbList.tsx';
import { Glide } from '../../../components/Elements/Carousel/Glide.tsx';
import { Head } from '../../../components/Head';

const Home = () => {
  const title = 'Dashboard';

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
          {/* Sales & Stocks Charts Start */}
          <h2 className="small-title">Sales & Stocks</h2>
          <Card className="mb-2 h-auto sh-xl-24" id="introFirst">
            <Card.Body>
              <Row className="g-0 h-100">
                <p>Here will be some widget</p>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-5 h-auto sh-xl-24">
            <Card.Body>
              <Row className="g-0 h-100">
                <p>Another widget</p>
              </Row>
            </Card.Body>
          </Card>
          {/* Sales & Stocks Charts End */}

          {/* Stats Start */}
          <h2 className="small-title">Stats</h2>
          <Row className="gx-2">
            <Col className="p-0">
              <Glide
                noControls
                options={{
                  gap: 0,
                  rewind: false,
                  bound: true,
                  perView: 6,
                  breakpoints: {
                    400: { perView: 1 },
                    600: { perView: 2 },
                    1400: { perView: 3 },
                    1600: { perView: 4 },
                    1900: { perView: 5 },
                    3840: { perView: 6 },
                  },
                }}
              >
                <Glide.Item>
                  <Card className="sh-20 hover-border-primary mb-5">
                    <Card.Body className="p-4 text-center align-items-center d-flex flex-column justify-content-between">
                      <div className="d-flex sh-5 sw-5 bg-gradient-light mb-3 align-items-center justify-content-center rounded-xl">
                        <Alarm></Alarm>
                      </div>
                      <p className="mb-0 lh-1">Pending Orders</p>
                      <p className="cta-3 mb-0 text-primary">25</p>
                    </Card.Body>
                  </Card>
                </Glide.Item>
                <Glide.Item>
                  <Card className="sh-20 hover-border-primary mb-5">
                    <Card.Body className="p-4 text-center align-items-center d-flex flex-column justify-content-between">
                      <div className="d-flex sh-5 sw-5 bg-gradient-light mb-3 align-items-center justify-content-center rounded-xl">
                        <Compass></Compass>
                      </div>
                      <p className="mb-0 lh-1">Shipped Orders</p>
                      <p className="cta-3 mb-0 text-primary">48</p>
                    </Card.Body>
                  </Card>
                </Glide.Item>
                <Glide.Item>
                  <Card className="sh-20 hover-border-primary mb-5">
                    <Card.Body className="p-4 text-center align-items-center d-flex flex-column justify-content-between">
                      <div className="d-flex sh-5 sw-5 bg-gradient-light mb-3 align-items-center justify-content-center rounded-xl">
                        <CheckCircle></CheckCircle>
                      </div>
                      <p className="mb-0 lh-1">Delivered Orders</p>
                      <p className="cta-3 mb-0 text-primary">53</p>
                    </Card.Body>
                  </Card>
                </Glide.Item>
                <Glide.Item>
                  <Card className="sh-20 hover-border-primary mb-5">
                    <Card.Body className="p-4 text-center align-items-center d-flex flex-column justify-content-between">
                      <div className="d-flex sh-5 sw-5 bg-gradient-light mb-3 align-items-center justify-content-center rounded-xl">
                        <ArrowBarLeft></ArrowBarLeft>
                      </div>
                      <p className="mb-0 lh-1">Returned Orders</p>
                      <p className="cta-3 mb-0 text-primary">4</p>
                    </Card.Body>
                  </Card>
                </Glide.Item>
                <Glide.Item>
                  <Card className="sh-20 hover-border-primary mb-5">
                    <Card.Body className="p-4 text-center align-items-center d-flex flex-column justify-content-between">
                      <div className="d-flex sh-5 sw-5 bg-gradient-light mb-3 align-items-center justify-content-center rounded-xl">
                        <Hexagon></Hexagon>
                      </div>
                      <p className="mb-0 lh-1">Unconfirmed Orders</p>
                      <p className="cta-3 mb-0 text-primary">3</p>
                    </Card.Body>
                  </Card>
                </Glide.Item>
                <Glide.Item>
                  <Card className="sh-20 hover-border-primary mb-5">
                    <Card.Body className="p-4 text-center align-items-center d-flex flex-column justify-content-between">
                      <div className="d-flex sh-5 sw-5 bg-gradient-light mb-3 align-items-center justify-content-center rounded-xl">
                        <Pin></Pin>
                      </div>
                      <p className="mb-0 lh-1">Missing Orders</p>
                      <p className="cta-3 mb-0 text-primary">2</p>
                    </Card.Body>
                  </Card>
                </Glide.Item>
              </Glide>
            </Col>
          </Row>
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
        {/* Logs Start */}
        <Col lg="6" className="mb-5">
          <h2 className="small-title">Logs</h2>
          <Card className="sh-40 h-lg-100-card">
            <Card.Body className="mb-n2 scroll-out h-100">
              <OverlayScrollbarsComponent
                options={{
                  scrollbars: { autoHide: 'leave' },
                  overflow: { x: 'hidden', y: 'scroll' },
                }}
                className="h-100"
              >
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Circle className="text-primary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">New user registiration</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">18 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Square className="text-secondary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">
                          Product out of stock: Breadstick
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">15 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Triangle className="text-tertiary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">
                          Category page returned an error
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Hexagon className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">14 products added</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Hexagon className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">New sale: Soda Bread</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Square className="text-secondary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">
                          Product out of stock: Breadstick
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">15 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Triangle className="text-tertiary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">
                          Product page returned an error
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">14 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Hexagon className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">New sale: Steirer Brot</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Hexagon className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Recived a support ticket</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Hexagon className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Recived a support ticket</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                      <div className="sh-3">
                        <Hexagon className="text-quaternary align-top" />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                      <div className="d-flex flex-column">
                        <div className="text-alternate mt-n1 lh-1-25">Recived a comment</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                      <div className="text-muted ms-2 mt-n1 lh-1-25">13 Dec</div>
                    </div>
                  </Col>
                </Row>
              </OverlayScrollbarsComponent>
            </Card.Body>
          </Card>
        </Col>
        {/* Logs End */}

        {/* Categories Start */}
        <Col lg="6" className="mb-5">
          <h2 className="small-title">Categories</h2>
          <Row className="g-2">
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up" id="introThird">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <Cup className="text-primary" />
                    <p className="heading mt-3 text-body">Cupcakes</p>
                    <div className="text-extra-small fw-medium text-muted">14 PRODUCTS</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <Magic className="text-primary" />
                    <p className="heading mt-3 text-body">Breads</p>
                    <div className="text-extra-small fw-medium text-muted">3 PRODUCTS</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <Tree className="text-primary" />
                    <p className="heading mt-3 text-body">Vegetables</p>
                    <div className="text-extra-small fw-medium text-muted">8 PRODUCTS</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <Fan className="text-primary" />
                    <p className="heading mt-3 text-body">Fruits</p>
                    <div className="text-extra-small fw-medium text-muted">9 PRODUCTS</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <Scissors className="text-primary" />
                    <p className="heading mt-3 text-body">Mushrooms</p>
                    <div className="text-extra-small fw-medium text-muted">3 PRODUCTS</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <Water className="text-primary" />
                    <p className="heading mt-3 text-body">Drinks</p>
                    <div className="text-extra-small fw-medium text-muted">4 PRODUCTS</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        {/* Categories End */}
      </Row>

      {/* Extend Your Knowledge Start */}
      <Row>
        <h2 className="small-title">Extend Your Knowledge</h2>
        <Col md="4" className="mb-5">
          <Card className="w-100 sh-20 sh-md-22 hover-img-scale-up">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              src="/img/banner/cta-standard-1.webp"
              className="card-img h-100 scale"
              alt="card image"
            />
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
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              src="/img/banner/cta-standard-2.webp"
              className="card-img h-100 scale"
              alt="card image"
            />
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
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              src="/img/banner/cta-standard-3.webp"
              className="card-img h-100 scale"
              alt="card image"
            />
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

export default Home;
