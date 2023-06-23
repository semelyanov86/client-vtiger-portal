import { useEffect, useState } from 'react';
import { Row, Col, Dropdown, Card } from 'react-bootstrap';
import {
  BoxSeam,
  Calendar,
  Clipboard,
  Pencil,
  Tag,
  ThreeDots,
  Tools,
  Truck,
} from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router';

import { DetailPageTitle, Spinner as Spinner2 } from '../../../components/Elements';
import { Head } from '../../../components/Head';
import { NULLABLE_DATE } from '../../../config/constants.ts';
import { DisplayMoney } from '../../../utils/DisplayMoney.tsx';
import { useManager } from '../../manager/api/getManager.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { CardPayment } from '../../payment/components/CardPayment.tsx';
import { PaymentForm } from '../../payment/components/PaymentForm.tsx';
import { ManagerInfo } from '../../project/components/organisms/ManagerInfo.tsx';
import { useSalesOrder } from '../api/getSalesOrder.ts';

export const SalesOrder = () => {
  const { salesOrderId } = useParams();
  const salesOrderQuery = useSalesOrder({ soId: salesOrderId ?? '' });
  const [isManagerQueryEnabled, setIsManagerQueryEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (salesOrderQuery.data) {
      setIsManagerQueryEnabled(true);
    }
  }, [salesOrderQuery.data]);

  const managerQuery = useManager(
    salesOrderQuery.data?.assigned_user_id ?? '',
    isManagerQueryEnabled
  );

  if (salesOrderQuery.isLoading) {
    return <Spinner2></Spinner2>;
  }
  if (!salesOrderQuery.data) {
    return null;
  }

  const title = salesOrderQuery.data.subject;

  return (
    <>
      <Head title={title} />

      <div className="page-title-container">
        <DetailPageTitle
          title={title}
          modified={salesOrderQuery.data.modifiedtime}
          target={{ to: 'app/sales-orders/' + salesOrderId, text: salesOrderId ?? '' }}
          parent={{ to: 'app/sales-orders', text: 'Sales Orders' }}
        >
          <>
            <Dropdown className="w-100 w-md-auto">
              <Dropdown.Toggle className="w-100 w-md-auto" variant="outline-primary">
                <FormattedMessage id="so.sostatus"></FormattedMessage>:{' '}
                <FormattedMessage id={'so.' + salesOrderQuery.data.sostatus}></FormattedMessage>
              </Dropdown.Toggle>
            </Dropdown>
            {salesOrderQuery.data.invoices?.length > 0 && (
              <Dropdown className="ms-1">
                <Dropdown.Toggle
                  className="btn-icon btn-icon-only dropdown-toggle-no-arrow"
                  variant="outline-primary"
                >
                  <ThreeDots></ThreeDots>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {salesOrderQuery.data.invoices.map((invoice) => (
                    <Dropdown.Item
                      key={invoice.id}
                      onClick={() => navigate('/app/invoices/' + invoice.id)}
                    >
                      <FormattedMessage id="so.view-invoice"></FormattedMessage>{' '}
                      {invoice.invoice_no}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </>
        </DetailPageTitle>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}
          <h2 className="small-title">
            <FormattedMessage id="so.main-info"></FormattedMessage>
          </h2>
          <Row className="g-2 mb-5">
            <Col sm="6">
              <Card className="sh-13 sh-lg-15 sh-xl-14">
                <Card.Body className="h-100 py-3 d-flex align-items-center">
                  <Row className="g-0 align-items-center">
                    <Col xs="auto" className="pe-3">
                      <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                        <Tag className="text-primary"></Tag>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex align-items-center lh-1-25">
                        <FormattedMessage id="so.salesorder_no"></FormattedMessage>
                      </div>
                      <div className="text-primary">{salesOrderQuery.data.salesorder_no}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="6">
              <Card className="sh-13 sh-lg-15 sh-xl-14">
                <Card.Body className="h-100 py-3 d-flex align-items-center">
                  <Row className="g-0 align-items-center">
                    <Col xs="auto" className="pe-3">
                      <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                        <Clipboard className="text-primary"></Clipboard>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex align-items-center lh-1-25">
                        <FormattedMessage id="so.pending"></FormattedMessage>
                      </div>
                      <div className="text-primary">{salesOrderQuery.data.pending}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="6">
              <Card className="sh-13 sh-lg-15 sh-xl-14">
                <Card.Body className="h-100 py-3 d-flex align-items-center">
                  <Row className="g-0 align-items-center">
                    <Col xs="auto" className="pe-3">
                      <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                        <Truck className="text-primary"></Truck>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex align-items-center lh-1-25">
                        <FormattedMessage id="so.carrier"></FormattedMessage>
                      </div>
                      <div className="text-primary">{salesOrderQuery.data.carrier}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="6">
              <Card className="sh-13 sh-lg-15 sh-xl-14">
                <Card.Body className="h-100 py-3 d-flex align-items-center">
                  <Row className="g-0 align-items-center">
                    <Col xs="auto" className="pe-3">
                      <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                        <Calendar className="text-primary"></Calendar>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-flex align-items-center lh-1-25">
                        <FormattedMessage id="so.duedate"></FormattedMessage>
                      </div>
                      <div className="text-primary">
                        {salesOrderQuery.data.duedate == NULLABLE_DATE
                          ? '--'
                          : formatToUserReadableDate(salesOrderQuery.data.duedate)}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* Status End */}

          {/* Cart Start */}
          <h2 className="small-title">
            <FormattedMessage id="so.cart"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body>
              <div className="mb-5">
                {salesOrderQuery.data.LineItems.map((item) => (
                  <Row key={item.sequence_no} className="g-0 sh-9 mb-3">
                    <Col xs="auto">
                      {item.entity_type == 'Services' ? <Tools></Tools> : <BoxSeam></BoxSeam>}
                    </Col>
                    <Col>
                      <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                        <Row className="g-0 h-100 align-items-start align-content-center">
                          <Col xs="12" className="d-flex flex-column mb-2">
                            <div>{item.product_name}</div>
                            <div className="text-muted text-small">{item.comment}</div>
                          </Col>
                          <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                            <Row className="g-0">
                              <Col
                                xs="6"
                                className="d-flex flex-row pe-2 align-items-end text-alternate"
                              >
                                <span>{item.quantity}</span>
                                <span className="text-muted ms-1 me-1">x</span>
                                <DisplayMoney
                                  classes="text-small"
                                  symbol={salesOrderQuery.data.currency.currency_symbol}
                                  amount={item.listprice}
                                ></DisplayMoney>
                              </Col>
                              <Col
                                xs="6"
                                className="d-flex flex-row align-items-end justify-content-end text-alternate"
                              >
                                <DisplayMoney
                                  classes="text-small"
                                  symbol={salesOrderQuery.data.currency.currency_symbol}
                                  amount={item.margin}
                                ></DisplayMoney>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
              <div>
                <Row className="g-0 mb-2">
                  <Col xs="auto" className="ms-auto ps-3 text-muted">
                    <FormattedMessage id="so.hdnSubTotal"></FormattedMessage>
                  </Col>
                  <Col xs="auto" className="sw-13 text-end">
                    <DisplayMoney
                      classes="text-small text-muted"
                      symbol={salesOrderQuery.data.currency.currency_symbol}
                      amount={salesOrderQuery.data.hdnSubTotal}
                    ></DisplayMoney>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto" className="ms-auto ps-3 text-muted">
                    <FormattedMessage id="so.shipping"></FormattedMessage>
                  </Col>
                  <Col xs="auto" className="sw-13 text-end">
                    <DisplayMoney
                      classes="text-small text-muted"
                      symbol={salesOrderQuery.data.currency.currency_symbol}
                      amount={salesOrderQuery.data['shipping_&_handling']}
                    ></DisplayMoney>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto" className="ms-auto ps-3 text-muted">
                    <FormattedMessage id="so.tax"></FormattedMessage>
                  </Col>
                  <Col xs="auto" className="sw-13 text-end">
                    <DisplayMoney
                      classes="text-small text-muted"
                      symbol={salesOrderQuery.data.currency.currency_symbol}
                      amount={salesOrderQuery.data['shipping_&_handling_shtax1']}
                    ></DisplayMoney>
                  </Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto" className="ms-auto ps-3 text-muted">
                    <FormattedMessage id="so.hdnGrandTotal"></FormattedMessage>
                  </Col>
                  <Col xs="auto" className="sw-13 text-end">
                    <DisplayMoney
                      classes="text-small text-muted"
                      symbol={salesOrderQuery.data.currency.currency_symbol}
                      amount={salesOrderQuery.data.hdnGrandTotal}
                    ></DisplayMoney>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          {/* Cart End */}

          {/* Activity Start */}
          <h2 className="small-title">
            <FormattedMessage id="so.payment"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body>
              {salesOrderQuery.data.terms_conditions}
              <p></p>
              <PaymentForm>
                <CardPayment
                  currency={salesOrderQuery.data.currency.currency_code}
                  paymentMethodType="card"
                  invoice_id=""
                  so_id={salesOrderQuery.data.id}
                  amount={salesOrderQuery.data.hdnGrandTotal}
                ></CardPayment>
              </PaymentForm>
            </Card.Body>
          </Card>
          {/* Activity End */}

          <h2 className="small-title">
            <FormattedMessage id="so.manager"></FormattedMessage>
          </h2>
          <div className="mb-5">
            <p className="text-small text-muted mb-2">
              <FormattedMessage id="project.manager"></FormattedMessage>
            </p>
            <Card className="mb-5">
              <Card.Body>
                <ManagerInfo manager={managerQuery.data}></ManagerInfo>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xl="4" xxl="3">
          {/* Address Start */}
          <h2 className="small-title">
            <FormattedMessage id="so.address"></FormattedMessage>
          </h2>
          <Card className="mb-5">
            <Card.Body className="mb-n5">
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="so.billing-address"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.bill_street"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.bill_street}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.bill_city"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.bill_city}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.bill_state"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.bill_state}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.bill_code"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.bill_code}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.bill_country"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.bill_country}</Col>
                </Row>
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="so.shipping-address"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.ship_street"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.ship_street}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.ship_city"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.ship_city}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.ship_state"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.ship_state}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.ship_code"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.ship_code}</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="me-1">
                      <FormattedMessage id="so.ship_country"></FormattedMessage>:
                    </div>
                  </Col>
                  <Col className="text-alternate">{salesOrderQuery.data.ship_country}</Col>
                </Row>
              </div>
              <div className="mb-5">
                <p className="text-small text-muted mb-2">
                  <FormattedMessage id="so.description"></FormattedMessage>
                </p>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <Pencil className="text-primary"></Pencil>
                    </div>
                  </Col>
                  <Col className="text-alternate">
                    {salesOrderQuery.data.description ? salesOrderQuery.data.description : '--'}
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          {/* Address End */}
        </Col>
      </Row>
    </>
  );
};
