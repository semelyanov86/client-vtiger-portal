import { Row, Col, Button, Card, Form } from 'react-bootstrap';
import { ChevronLeft, Printer } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Spinner as Spinner2 } from '../../../components/Elements';
import { Head } from '../../../components/Head';
import useCompanyStore from '../../company/stores/company.ts';
import { useInvoice } from '../api/getInvoice.ts';
import { useAccount } from '../../account/api/getAccount.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';

export const Invoice = () => {
  const { invoiceId } = useParams();
  const invoiceQuery = useInvoice({ invoiceId: invoiceId ?? '' });
  const { value: company } = useCompanyStore();
  const accountStore = useAccount(true);

  if (invoiceQuery.isLoading) {
    return <Spinner2></Spinner2>;
  }
  if (!invoiceQuery.data) {
    return <FormattedMessage id="general.no-data" />;
  }
  if (!company) {
    return <FormattedMessage id="general.no-data" />;
  }
  const symbol = invoiceQuery.data.currency.currency_symbol;

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
                {company.address}, {company.city} {company.code}, {company.country}
              </div>
              <div className="text-small text-muted">{company.phone}</div>
            </Col>
          </Row>
          <div className="separator separator-light mt-5 mb-5" />
          <Row className="g-1 mb-5">
            {accountStore.isLoading ? (
              <Spinner2></Spinner2>
            ) : (
              <Col md="8">
                <div className="py-3">
                  <div>{accountStore.data && accountStore.data.accountname}</div>
                  <div>
                    {invoiceQuery.data.bill_street}, {invoiceQuery.data.bill_code}{' '}
                    {invoiceQuery.data.bill_city}, {invoiceQuery.data.bill_country}
                  </div>
                </div>
              </Col>
            )}

            <Col md="4">
              <div className="py-3 text-md-end">
                <div>
                  <FormattedMessage id="invoices.invoice"></FormattedMessage> #:{' '}
                  {invoiceQuery.data.invoice_no}
                </div>
                <div>{formatToUserReadableDate(invoiceQuery.data.invoicedate)}</div>
              </div>
            </Col>
          </Row>
          <div>
            <Row className="mb-4 d-none d-sm-flex">
              <Col xs="4">
                <p className="mb-0 text-small text-muted">
                  <FormattedMessage id="invoices.item-name"></FormattedMessage>
                </p>
              </Col>
              <Col xs="2">
                <p className="mb-0 text-small text-muted">
                  <FormattedMessage id="invoices.count"></FormattedMessage>
                </p>
              </Col>
              <Col xs="3" className="text-end">
                <p className="mb-0 text-small text-muted">
                  <FormattedMessage id="invoices.price"></FormattedMessage>
                </p>
              </Col>
              <Col xs="3" className="text-end">
                <p className="mb-0 text-small text-muted">
                  <FormattedMessage id="invoices.margin"></FormattedMessage>
                </p>
              </Col>
            </Row>
            {invoiceQuery.data.LineItems.map((item) => (
              <Row key={item.id} className="mb-4 mb-sm-2">
                <Col sm="4">
                  <h6 className="mb-0">{item.product_name}</h6>
                </Col>
                <Col sm="2">
                  <p className="mb-0 text-alternate">{item.quantity}</p>
                </Col>
                <Col sm="3" className="text-sm-end">
                  <p className="mb-0 text-alternate">
                    {symbol} {item.listprice}
                  </p>
                </Col>
                <Col sm="3" className="text-sm-end">
                  <p className="mb-0 text-alternate">
                    {symbol} {item.margin}
                  </p>
                </Col>
              </Row>
            ))}
          </div>
          <div className="separator separator-light mt-5 mb-5" />
          <Row>
            <Col className="text-sm-end text-muted">
              <div>
                <FormattedMessage id="invoices.hdnSubTotal"></FormattedMessage> :
              </div>
              <div>
                <FormattedMessage id="invoices.pre_tax_total"></FormattedMessage> :
              </div>
              <div>
                <FormattedMessage id="invoices.shipping"></FormattedMessage> :
              </div>
              <div>
                <FormattedMessage id="invoices.hdnGrandTotal"></FormattedMessage> :
              </div>
            </Col>
            <Col xs="auto" className="text-end">
              <div>
                {symbol} {invoiceQuery.data.hdnSubTotal}
              </div>
              <div>
                {symbol} {invoiceQuery.data.pre_tax_total}
              </div>
              <div>
                {symbol} {invoiceQuery.data['shipping_&_handling']}
              </div>
              <div>
                {symbol} {invoiceQuery.data.hdnGrandTotal}
              </div>
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
