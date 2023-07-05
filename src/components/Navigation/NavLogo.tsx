import { memo } from 'react';
import { Link } from 'react-router-dom';

import { DEFAULT_PATHS } from '../../config';
import useCompanyStore from '../../features/company/stores/company.ts';

export const NavLogo = memo(() => {
  const { value: company } = useCompanyStore();
  let logo = <div className="img" data-testid="defaultlogo" />;
  if (company.logo) {
    logo = <img src={'data:image/png;base64, ' + company.logo} alt={company.organizationname} />;
  }
  return (
    <div className="logo position-relative" data-testid="mainlogo">
      <Link to={DEFAULT_PATHS.DASHBOARD}>{logo}</Link>
    </div>
  );
});

NavLogo.displayName = 'NavLogo';
