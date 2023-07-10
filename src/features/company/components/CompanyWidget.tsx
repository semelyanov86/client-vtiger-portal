import { Card } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useCompanyStore from '../stores/company.ts';

import styles from './CompanyWidget.module.css';
import { RequisitesRow } from './molecules/RequisitesRow.tsx';

export const CompanyWidget = () => {
  const { value: company } = useCompanyStore();
  return (
    <>
      <h2 className="small-title mt-2">
        <FormattedMessage id="company.requisites"></FormattedMessage>
      </h2>
      <Card className={styles.scrollcard} body>
        <Card.Text>
          <RequisitesRow company={company} param="organizationname" />
          <RequisitesRow company={company} param="address" />
          <RequisitesRow company={company} param="city" />
          <RequisitesRow company={company} param="state" />
          <RequisitesRow company={company} param="country" />
          <RequisitesRow company={company} param="code" />
          <RequisitesRow company={company} param="phone" />
          <RequisitesRow company={company} param="fax" />
          <RequisitesRow company={company} param="website" />
          <RequisitesRow company={company} param="vatid" />
          <RequisitesRow company={company} param="inn" />
          <RequisitesRow company={company} param="kpp" />
          <RequisitesRow company={company} param="bankaccount" />
          <RequisitesRow company={company} param="bankname" />
          <RequisitesRow company={company} param="bankid" />
          <RequisitesRow company={company} param="corraccount" />
          <RequisitesRow company={company} param="director" />
          <RequisitesRow company={company} param="bookkeeper" />
          <RequisitesRow company={company} param="enterpreneur" />
          <RequisitesRow company={company} param="enterpreneurreg" />
          <RequisitesRow company={company} param="okpo" />
        </Card.Text>
      </Card>
    </>
  );
};
