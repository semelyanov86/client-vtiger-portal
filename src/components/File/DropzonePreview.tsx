import { FC } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { IPreviewProps } from 'react-dropzone-uploader';

const DropzonePreview: FC<IPreviewProps> = ({ meta }) => {
  const { name, status, previewUrl, size } = meta;

  return (
    <Row className="sw-40 border border-1 border-separator g-0 rounded-sm me-2 mb-2 position-relative z-index-1">
      <Col xs="auto" className="position-relative">
        {previewUrl ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={previewUrl} alt="preview image" className="sw-12 sh-9 rounded-sm-start" />
        ) : (
          <div className="sw-12 sh-9 d-flex justify-content-center align-items-center">
            <i className="cs-file-text dzu-preview-icon" data-testid="fallback-icon" />
          </div>
        )}
        {(status === 'error_upload_params' ||
          status === 'exception_upload' ||
          status === 'error_upload') && (
          <div className="dzu-preview-error">
            <i className="cs-close-circle" data-testid="close-icon" />
          </div>
        )}
        {status === 'done' && (
          <div className="dzu-preview-success">
            <i className="cs-check" data-testid="check-icon" />
          </div>
        )}
        {status !== 'error_upload_params' &&
          status !== 'exception_upload' &&
          status !== 'error_upload' &&
          status !== 'done' && (
            <div className="dzu-preview-spinner" data-testid="preview-spinner">
              <Spinner
                animation="border"
                size="sm"
                variant="primary"
                className="dzu-spinner-border"
              />
            </div>
          )}
      </Col>
      <Col className="px-3 d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-between">
          <div>
            <p className="mb-1 pe-2 sw-20 dzu-preview-file-name">{name}</p>
            <div className="text-small text-primary">{Math.round(size / 1000)} KB</div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DropzonePreview;
