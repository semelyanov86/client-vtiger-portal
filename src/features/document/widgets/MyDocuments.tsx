import { useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { useUserStore } from '../../../stores/user.ts';
import { formatToUserReadableDate } from '../../misc/services/Dates.ts';
import { DropzoneWidget } from '../../task/components/DropzoneWidget.tsx';
import { useMyDocuments } from '../api/getMyDocuments.ts';
import { DownloadButton } from '../components/DownloadButton.tsx';

export const MyDocuments = () => {
  const { value } = useUserStore();
  const documentQuery = useMyDocuments();
  const [selectedDocument, setSelectedDocument] = useState('');

  if (documentQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  if (!documentQuery.data) {
    return (
      <p>
        <FormattedMessage id="general.no-data"></FormattedMessage>
      </p>
    );
  }

  const handleDownload = (documentId: string) => {
    setSelectedDocument(documentId);
  };

  return (
    <div className="mb-5">
      {/* List Header Start */}
      <Row className="g-0 h-100 align-content-center d-none d-md-flex ps-4 pe-3 mb-2 custom-sort">
        <Col md="6" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
          <div className="text-muted text-small cursor-pointer sort">
            <FormattedMessage id="documents.name"></FormattedMessage>
          </div>
        </Col>
        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">
            <FormattedMessage id="documents.date"></FormattedMessage>
          </div>
        </Col>
        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">
            <FormattedMessage id="documents.size"></FormattedMessage>
          </div>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {documentQuery.data.map((document) => (
        <Card key={document.id} className={`mb-2`}>
          <Card.Body className="py-0 ps-4 pe-3 sh-14 sh-md-6">
            <Row className="g-0 h-100 align-content-center cursor-default">
              <Col
                xs="2"
                md="2"
                className="d-flex flex-column justify-content-center mb-1 mb-md-0 h-md-100 position-relative"
              >
                <DownloadButton
                  document={document}
                  selectedDocument={selectedDocument}
                  parentId={value.crmid}
                  module="users"
                  handleDownload={handleDownload}
                ></DownloadButton>
              </Col>
              <Col
                xs="9"
                md="4"
                className="d-flex flex-column justify-content-center mb-1 mb-md-0 h-md-100 position-relative"
              >
                <div className="text-alternate">{document.filename}</div>
              </Col>
              <Col
                md="2"
                className="d-flex flex-column justify-content-center order-4 ms-5 ms-md-0"
              >
                <div className="text-alternate">{document.filesize}</div>
              </Col>
              <Col
                md="3"
                className="d-flex flex-column justify-content-center order-3 ms-5 ms-md-0"
              >
                <div className="text-alternate">
                  {formatToUserReadableDate(document.createdtime)}
                </div>
              </Col>
              <Col
                xs="1"
                md="1"
                className="d-flex flex-column justify-content-center align-items-md-end order-2 text-end order-md-last"
              >
                <X></X>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* List Items End */}
      <DropzoneWidget url={`/users/my/documents`} parentId={value.id}></DropzoneWidget>
    </div>
  );
};
