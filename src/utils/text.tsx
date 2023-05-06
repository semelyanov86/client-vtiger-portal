import * as icons from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { USE_MULTI_LANGUAGE } from '../config';

export const getLabel = (label?: string, iconName?: keyof typeof icons) => {
  // eslint-disable-next-line import/namespace
  const BootstrapIcon = icons[iconName ?? 'House'];
  if (!label) {
    label = '';
  }
  return (
    <>
      {iconName && <BootstrapIcon />}
      <span className="label mx-2">
        {USE_MULTI_LANGUAGE ? <FormattedMessage id={label}></FormattedMessage> : label}
      </span>
    </>
  );
};
