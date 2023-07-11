import { Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

interface TextareaDisplayProps {
  value: string;
  name: string;
}

export const TextareaDisplay = ({ value, name }: TextareaDisplayProps) => {
  return (
    <div className="mb-4 pb-4 border-bottom border-separator-light">
      <Row className="g-0 sh-sm-5 h-auto">
        <Col className="">
          <Row className="h-100 g-2">
            <Col className="h-sm-100 d-flex flex-column justify-content-sm-center mb-1 mb-sm-0">
              <div>
                <FormattedMessage id={'tickets.' + name}></FormattedMessage>:
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div>
        <div className="mt-4">{value}</div>
      </div>
    </div>
  );
};
