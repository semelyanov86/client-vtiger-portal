import { Card } from 'react-bootstrap';

import useCompanyStore from '../stores/company.ts';

import styles from './CompanyWidget.module.css';
import { FormattedMessage } from 'react-intl';

export const CompanyWidget = () => {
  const { value: company } = useCompanyStore();
  return (
    <>
      <h2 className="small-title mt-2">Our requisites</h2>
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
          <br />
          {company.inn &&
            (
              <b>
                <FormattedMessage id="company.inn" />
              </b>
            ) +
              ': ' +
              company.inn}
          <br />
          {company.kpp &&
            (
              <b>
                <FormattedMessage id="company.kpp" />
              </b>
            ) +
              ': ' +
              company.kpp}
          <br />
          {company.bankaccount &&
            (
              <b>
                <FormattedMessage id="company.bankaccount" />
              </b>
            ) +
              ': ' +
              company.bankaccount}
          <br />
          {company.bankname &&
            (
              <b>
                <FormattedMessage id="company.bankname" />
              </b>
            ) +
              ': ' +
              company.bankname}
          <br />
          {company.bankid &&
            (
              <b>
                <FormattedMessage id="company.bankid" />
              </b>
            ) +
              ': ' +
              company.bankid}
          <br />
          {company.corraccount &&
            (
              <b>
                <FormattedMessage id="company.corraccount" />
              </b>
            ) +
              ': ' +
              company.corraccount}
          <br />
          {company.director &&
            (
              <b>
                <FormattedMessage id="company.director" />
              </b>
            ) +
              ': ' +
              company.director}
          <br />
          {company.bookkeeper &&
            (
              <b>
                <FormattedMessage id="company.bookkeeper" />
              </b>
            ) +
              ': ' +
              company.bookkeeper}
          <br />
          {company.enterpreneur &&
            (
              <b>
                <FormattedMessage id="company.enterpreneur" />
              </b>
            ) +
              ': ' +
              company.enterpreneur}
          <br />
          {company.enterpreneurreg &&
            (
              <b>
                <FormattedMessage id="company.enterpreneurreg" />
              </b>
            ) +
              ': ' +
              company.enterpreneurreg}
          <br />
          {company.okpo &&
            (
              <b>
                <FormattedMessage id="company.okpo" />
              </b>
            ) +
              ': ' +
              company.okpo}
          <br />
        </Card.Text>
      </Card>
    </>
  );
};
