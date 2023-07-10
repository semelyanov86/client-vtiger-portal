import { FormattedMessage } from 'react-intl';

import { Company } from '../../types';

interface RequisitesRowProps {
  company: Company;
  param: keyof Company;
}

export const RequisitesRow = ({ company, param }: RequisitesRowProps) => {
  if (!company[param]) {
    return null;
  }
  return (
    <>
      <b>
        <FormattedMessage id={'company.' + param} />
      </b>
      : <span>{company[param]}</span>
      <br />
    </>
  );
};
