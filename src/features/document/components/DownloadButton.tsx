import { Spinner } from 'react-bootstrap';
import { Download, FileArrowDown, FileText } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { useDocumentContent } from '../api/getDocumentContentFromModule.ts';
import { Document } from '../types';

interface DownloadButtonProps {
  document: Document;
  selectedDocument: string;
  parentId: string;
  module: string;
  handleDownload: (documentId: string) => void;
}

export const DownloadButton = ({
  document,
  selectedDocument,
  parentId,
  module,
  handleDownload,
}: DownloadButtonProps) => {
  const contentQuery = useDocumentContent({
    ticketId: parentId ?? '',
    fileId: selectedDocument,
    module: module,
    enabled: selectedDocument != '' && selectedDocument != undefined,
  });

  if (document.filelocationtype == 'E') {
    return (
      <a href={document.filename} target="_blank" rel="noreferrer">
        <FileArrowDown size={17} className="alternate-link"></FileArrowDown>
      </a>
    );
  }

  if (document.imageattachmentids == '') {
    return null;
  }

  if (selectedDocument == document.imageattachmentids && contentQuery.isLoading) {
    return <Spinner animation="border" variant="secondary" />;
  }

  if (contentQuery.data && selectedDocument == document.imageattachmentids) {
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
    <NavLink to="#" onClick={() => handleDownload(document.imageattachmentids)}>
      <Download size={17} className="alternate-link"></Download>
    </NavLink>
  );
};
