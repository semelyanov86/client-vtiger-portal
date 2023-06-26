import { Helmet } from 'react-helmet-async';

import { REACT_HELMET_PROPS } from '../../config';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | ${REACT_HELMET_PROPS.defaultTitle}` : undefined}
      defaultTitle="Vtiger Portal"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
