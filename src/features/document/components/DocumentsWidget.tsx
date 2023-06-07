import { useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { FileText } from 'react-bootstrap-icons';

import { useDocumentsFromTicket } from '../api/getDocumentsFromTicket.ts';

import styles from './DocumentsWudget.module.css';
import { DownloadButton } from './DownloadButton.tsx';

interface DocumentsWidgetProps {
  parentId: string | undefined;
  module: string;
  prefix?: string;
}

export const DocumentsWidget = ({ parentId, module, prefix = '' }: DocumentsWidgetProps) => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const documentsQuery = useDocumentsFromTicket({
    ticketId: parentId ?? '',
    module: module,
    prefix: prefix,
  });

  if (documentsQuery.isLoading) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }

  if (!documentsQuery.data || !parentId) {
    return null;
  }

  const handleDownload = (documentId: string) => {
    setSelectedDocument(documentId);
  };

  return (
    <div className="d-flex flex-row flex-wrap">
      {documentsQuery.data.map((document) => (
        <div key={document.id} className="sw-40 me-2 mb-2">
          <Row className="g-0 rounded-sm sh-8 border">
            <Col xs="auto">
              <div className="sw-10 d-flex justify-content-center align-items-center h-100">
                <FileText className="text-primary"></FileText>
              </div>
            </Col>
            <Col className="rounded-sm-end d-flex flex-column justify-content-center pe-3">
              <div className="d-flex justify-content-between">
                <p className={'mb-0 clamp-line ' + styles.filename} data-line="1">
                  {document.notes_title}
                </p>
                <DownloadButton
                  document={document}
                  selectedDocument={selectedDocument}
                  parentId={parentId}
                  module={module}
                  handleDownload={handleDownload}
                ></DownloadButton>
              </div>
              <div className="text-small text-primary">{document.filesize}</div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
