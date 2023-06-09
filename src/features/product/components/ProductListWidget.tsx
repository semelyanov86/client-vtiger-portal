import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { DisplayMoney } from '../../../utils/DisplayMoney.tsx';
import { useProducts } from '../api/getProducts.ts';

import { ProductImage } from './atoms/ProductImage.tsx';

export const ProductListWidget = () => {
  const productsQuery = useProducts({
    page: 1,
    size: 5,
    search: '',
    sort: '',
    discontinued: true,
  });
  if (productsQuery.isLoading) {
    return <Spinner animation="border" variant="primary" data-testid="spinner"></Spinner>;
  }
  if (!productsQuery.data || !productsQuery.data.data || productsQuery.data.data.length === 0) {
    return (
      <p data-testid="no-data-message">
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }

  return (
    <>
      {productsQuery.data.data.map((product) => (
        <Card key={product.id} className="mb-2" id="introSecond">
          <Row className="g-0 sh-12">
            <Col xs="auto">
              <ProductImage product={product} />
            </Col>
            <Col>
              <Card.Body className="pt-0 pb-0 h-100">
                <Row className="g-0 h-100 align-content-center">
                  <Col md="7" className="d-flex flex-column mb-2 mb-md-0">
                    <NavLink to={product.website}>{product.productname}</NavLink>
                    <div className="text-small text-muted text-truncate">{product.description}</div>
                  </Col>
                  <Col md="5" className="d-flex align-items-center justify-content-md-end">
                    <DisplayMoney
                      classes={''}
                      symbol={product.currency.currency_symbol}
                      amount={product.unit_price}
                    ></DisplayMoney>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};
