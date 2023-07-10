import { ReactNode } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';

import { ScrollByCount } from '../../../components/Scrollspy/ScrollByCount.tsx';
import { formatToUserReadableDate } from '../services/Dates.ts';
import { Entity } from '../types/entity.ts';

interface ListEntitiesProps<P extends Entity> {
  entities: P[];
  headerExtractor: (entity: P) => string;
  statusExtractor: (entity: P) => string;
  scrollCount?: number;
  renderEntity?: (entity: P) => ReactNode;
}

export const ListEntities = <P extends Entity>({
  entities,
  headerExtractor,
  statusExtractor,
  renderEntity,
  scrollCount = 3,
}: ListEntitiesProps<P>) => {
  return (
    <ScrollByCount count={scrollCount}>
      {entities.map((entity) =>
        renderEntity ? (
          renderEntity(entity)
        ) : (
          <Card key={entity.id} className="mb-2 sh-11 sh-md-8">
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col md="3" className="d-flex align-items-center mb-2 mb-md-0">
                  {headerExtractor(entity)}
                </Col>
                <Col
                  xs="5"
                  md="4"
                  className="d-flex align-items-center text-medium justify-content-start justify-content-md-center text-muted"
                >
                  {entity.label}
                </Col>
                <Col
                  xs="5"
                  md="3"
                  className="d-flex align-items-center justify-content-center text-muted"
                >
                  {formatToUserReadableDate(entity.createdtime)}
                </Col>
                <Col
                  xs="2"
                  md="2"
                  className="d-flex align-items-center text-muted text-medium mb-1 mb-md-0 justify-content-end"
                >
                  <Badge bg="outline-primary" className="py-1 px-3 text-small lh-1-5">
                    {statusExtractor(entity)}
                  </Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )
      )}
    </ScrollByCount>
  );
};
