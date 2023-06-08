import { Row, Col, Button, Card } from 'react-bootstrap';
import { ChevronLeft, Printer } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Spinner as Spinner2 } from '../../../components/Elements';
import { Head } from '../../../components/Head';
import { useInvoice } from '../api/getInvoice.ts';
import useCompanyStore from '../../company/stores/company.ts';

export const Invoice = () => {
  const { invoiceId } = useParams();
  const invoiceQuery = useInvoice({ invoiceId: invoiceId ?? '' });
  const { value: company } = useCompanyStore();

  if (invoiceQuery.isLoading) {
    return <Spinner2></Spinner2>;
  }
  if (!invoiceQuery.data) {
    return <FormattedMessage id="general.no-data" />;
  }
  if (!company) {
    return <FormattedMessage id="general.no-data" />;
  }

  return (
    <>
      <Head title={invoiceQuery.data.subject} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink
              className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
              to="/app/invoices"
            >
              <ChevronLeft size={13}></ChevronLeft>
              <span className="align-middle text-small ms-1">
                <FormattedMessage id="invoices.list"></FormattedMessage>
              </span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {invoiceQuery.data.subject}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col
            xs="12"
            sm="auto"
            className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3"
          >
            <Button
              variant="outline-primary"
              className="btn-icon btn-icon-start w-100 w-md-auto"
              onClick={() => {
                window.print();
                return false;
              }}
            >
              <Printer></Printer>{' '}
              <span>
                <FormattedMessage id="invoices.print"></FormattedMessage>
              </span>
            </Button>
            <Button variant="outline-dark" className="ms-2 btn-icon btn-icon-start w-100 w-md-auto">
              <FormattedMessage id="invoices.invoicestatus"></FormattedMessage>:{' '}
              {invoiceQuery.data.invoicestatus}
            </Button>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      {/* Standard Start */}
      {/* card-print: removes shadow, margin and padding */}
      {/* print-me: removes everyting from main .container except the element with the class if main tag has print-restricted class */}
      <h2 className="small-title">{invoiceQuery.data.description}</h2>
      <Card className="mb-5 card-print print-me">
        <Card.Body>
          <Row className="d-flex flex-row align-items-center">
            <Col md="6">
              <img src={'data:image/png;base64, ' + company.logo} alt={company.organizationname} />
            </Col>
            <Col md="6" className="text-end">
              <div className="mb-2">{company.organizationname}</div>
              <div className="text-small text-muted">
                4 Glamis Avenue, Strathmore Park, Wellington 6022, New Zealand
              </div>
              <div className="text-small text-muted">{company.phone}</div>
            </Col>
          </Row>
          <div className="separator separator-light mt-5 mb-5" />
          <Row className="g-1 mb-5">
            <Col md="8">
              <div className="py-3">
                <div>Blaine Cottrell</div>
                <div>55 Esk Street, Invercargill 9810, New Zealand</div>
              </div>
            </Col>
            <Col md="4">
              <div className="py-3 text-md-end">
                <div>Invoice #: 741</div>
                <div>02.02.2019</div>
              </div>
            </Col>
          </Row>
          <div>
            <Row className="mb-4 d-none d-sm-flex">
              <Col xs="6">
                <p className="mb-0 text-small text-muted">ITEM NAME</p>
              </Col>
              <Col xs="3">
                <p className="mb-0 text-small text-muted">COUNT</p>
              </Col>
              <Col xs="3" className="text-end">
                <p className="mb-0 text-small text-muted">PRICE</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Spelt Bread</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">3 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 14.82</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Naan</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 8.97</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Cozonac</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 18.24</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Michetta</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 4.24</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Arepa</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">3 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 6.27</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Pita</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 10.97</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Zopf</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 21.24</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Kommissbrot</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">3 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 42.15</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Ruisreikäleipä</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">1 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 11.15</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Cornbread</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 35.25</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Yeast Karavai</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">5 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 63.75</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Bammy</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 13.25</p>
              </Col>
            </Row>
            <Row className="mb-4 mb-sm-2">
              <Col sm="6">
                <h6 className="mb-0">Buccellato di Lucca</h6>
              </Col>
              <Col sm="3">
                <p className="mb-0 text-alternate">2 pcs</p>
              </Col>
              <Col sm="3" className="text-sm-end">
                <p className="mb-0 text-alternate">$ 19.50</p>
              </Col>
            </Row>
          </div>
          <div className="separator separator-light mt-5 mb-5" />
          <Row>
            <Col className="text-sm-end text-muted">
              <div>Subtotal :</div>
              <div>Tax :</div>
              <div>Shipping :</div>
              <div>Total :</div>
            </Col>
            <Col xs="auto" className="text-end">
              <div>$ 61.82</div>
              <div>$ 2.18</div>
              <div>$ 3.21</div>
              <div>$ 68.14</div>
            </Col>
          </Row>
          <div className="separator separator-light mt-5 mb-5" />
          <div className="text-small text-muted text-center">
            {invoiceQuery.data.terms_conditions}
          </div>
        </Card.Body>
      </Card>
      {/* Standard End */}
    </>
  );
};
