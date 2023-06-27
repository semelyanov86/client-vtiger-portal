import { NavLink } from 'react-router-dom';

import { DEFAULT_PATHS } from '../../../config';

export const LogoAuth = () => {
  return (
    <div className="sh-11">
      <NavLink to={DEFAULT_PATHS.APP}>
        <div className="logo-default" />
      </NavLink>
    </div>
  );
};
