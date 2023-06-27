import { House } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { DEFAULT_PATHS } from '../../../config';
import { HELP_URL } from '../../../config/constants.ts';

export const Unauthorized = () => {
  return (
    <div className="sw-lg-80 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-60 px-5">
        <div className="sh-11">
          <NavLink to={DEFAULT_PATHS.APP}>
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Ooops, it looks like an error!</h2>
          <h2 className="display-2 text-primary">Unauthorized</h2>
        </div>
        <div className="mb-5">
          <p className="h6">You have no permissions to access this page!</p>
          <p className="h6">
            If you think that is a mistake, please <NavLink to={HELP_URL}>contact</NavLink> us.
          </p>
        </div>
        <div>
          <NavLink to={DEFAULT_PATHS.APP} className="btn btn-icon btn-icon-start btn-primary">
            <House /> <span>Back to Home</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
