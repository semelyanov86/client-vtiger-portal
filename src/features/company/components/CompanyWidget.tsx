import { Card } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useCompanyStore from '../stores/company.ts';

import styles from './CompanyWidget.module.css';

export const CompanyWidget = () => {
  const { value: company } = useCompanyStore();
  return (
    <>
      <h2 className="small-title mt-2">
        <FormattedMessage id="company.requisites"></FormattedMessage>
      </h2>
      <Card className={styles.scrollcard} body>
        <Card.Text>
          <b>
            <FormattedMessage id="company.name" />
          </b>
          : {company.organizationname}
          <br />
          <b>
            <FormattedMessage id="company.address" />
          </b>
          : {company.address}
          <br />
          <b>
            <FormattedMessage id="company.city" />
          </b>
          : {company.city}
          <br />
          <b>
            <FormattedMessage id="company.state" />
          </b>
          : {company.state}
          <br />
          <b>
            <FormattedMessage id="company.country" />
          </b>
          : {company.country}
          <br />
          <b>
            <FormattedMessage id="company.code" />
          </b>
          : {company.code}
          <br />
          <b>
            <FormattedMessage id="company.phone" />
          </b>
          : {company.phone}
          <br />
          <b>
            <FormattedMessage id="company.fax" />
          </b>
          : {company.fax}
          <br />
          <b>
            <FormattedMessage id="company.website" />
          </b>
          : {company.website}
          <br />
          <b>
            <FormattedMessage id="company.vatid" />
          </b>
          : {company.vatid}
          {company.inn && (
            <>
              <b>
                <FormattedMessage id="company.inn" />
              </b>
            </>
          )}
          {company.inn && ': ' + company.inn}
          {company.kpp && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.kpp" />
              </b>
            </>
          )}
          {company.kpp && ': ' + company.kpp}
          {company.bankaccount && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.bankaccount" />
              </b>
            </>
          )}
          {company.bankaccount && ': ' + company.bankaccount}
          {company.bankname && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.bankname" />
              </b>
            </>
          )}
          {company.bankname && ': ' + company.bankname}
          {company.bankid && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.bankid" />
              </b>
            </>
          )}
          {company.bankid && ': ' + company.bankid}
          {company.corraccount && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.corraccount" />
              </b>
            </>
          )}
          {company.corraccount && ': ' + company.corraccount}
          {company.director && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.director" />
              </b>
            </>
          )}
          {company.director && ': ' + company.director}
          {company.bookkeeper && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.bookkeeper" />
              </b>
            </>
          )}
          {company.bookkeeper && ': ' + company.bookkeeper}
          {company.enterpreneur && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.enterpreneur" />
              </b>
            </>
          )}
          {company.enterpreneur && ': ' + company.enterpreneur}
          {company.enterpreneurreg && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.enterpreneurreg" />
              </b>
            </>
          )}
          {company.enterpreneurreg && ': ' + company.enterpreneurreg}
          {company.okpo && (
            <>
              <br />
              <b>
                <FormattedMessage id="company.okpo" />
              </b>
            </>
          )}
          {company.okpo && ': ' + company.okpo}
          <br />
        </Card.Text>
      </Card>
    </>
  );
};
