import { Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { DEFAULT_PRODUCT_MODULES } from '../../../config/constants.ts';
import { ProductListWidget } from '../../product/components/ProductListWidget.tsx';
import { ServicesListWidget } from '../../service/components/ServicesListWidget.tsx';

export const ProductWidget = () => {
  if (!DEFAULT_PRODUCT_MODULES) {
    return null;
  }
  return (
    <Col xl="6" className="mb-5">
      <h2 className="small-title">
        {DEFAULT_PRODUCT_MODULES.length == 1 ? (
          <FormattedMessage id={DEFAULT_PRODUCT_MODULES[0]}></FormattedMessage>
        ) : (
          <>
            <FormattedMessage id={DEFAULT_PRODUCT_MODULES[0]}></FormattedMessage> &&{' '}
            <FormattedMessage id={DEFAULT_PRODUCT_MODULES[1]}></FormattedMessage>
          </>
        )}
      </h2>
      {DEFAULT_PRODUCT_MODULES.map((mod) => {
        if (mod === 'products') {
          return <ProductListWidget key={mod}></ProductListWidget>;
        }
        if (mod === 'services') {
          return <ServicesListWidget key={mod}></ServicesListWidget>;
        }
      })}
    </Col>
  );
};
