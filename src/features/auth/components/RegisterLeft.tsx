import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export const RegisterLeft = () => {
  return (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">
              <FormattedMessage id="register.left-header" />
            </h1>
            <h1 className="display-3 text-white">
              <FormattedMessage id="register.left-subheader" />
            </h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            <FormattedMessage id="register.left-text" />
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              <FormattedMessage id="register.button" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
