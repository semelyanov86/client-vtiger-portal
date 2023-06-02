import { useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Download, FileText } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { useDocumentContent } from '../api/getDocumentContentFromModule.ts';
import { useDocumentsFromTicket } from '../api/getDocumentsFromTicket.ts';

import styles from './DocumentsWudget.module.css';

interface DocumentsWidgetProps {
  parentId: string | undefined;
  module: string;
}

export const DocumentsWidget = ({ parentId, module }: DocumentsWidgetProps) => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const documentsQuery = useDocumentsFromTicket({ ticketId: parentId ?? '', module: module });
  const contentQuery = useDocumentContent({
    ticketId: parentId ?? '',
    fileId: selectedDocument,
    module: module,
    enabled: selectedDocument != '' && selectedDocument != undefined,
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

  const getDownloadButton = (documentId: string) => {
    if (documentId == '') {
      return null;
    }
    if (selectedDocument == documentId && contentQuery.isLoading) {
      return <Spinner animation="border" variant="secondary" />;
    }
    if (contentQuery.data && selectedDocument == documentId) {
      return (
        <a
          href={'data:' + contentQuery.data.filetype + ';base64,' + contentQuery.data.filecontents}
          target="_blank"
          rel="noreferrer"
        >
          <FileText size={17} className="alternate-link"></FileText>;
        </a>
      );
    }
    return (
      <NavLink to="#" onClick={() => handleDownload(documentId)}>
        <Download size={17} className="alternate-link"></Download>
      </NavLink>
    );
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
                  {document.filename}
                </p>
                {getDownloadButton(document.imageattachmentids)}
              </div>
              <div className="text-small text-primary">{document.filesize}</div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
