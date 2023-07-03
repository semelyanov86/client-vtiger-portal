import { Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { ServiceContract } from '../types';

interface StatusSwitcherProps {
  statuses: { label: string; value: string }[];
  contract: ServiceContract;
}

export const StatusSwitcher = ({ statuses, contract }: StatusSwitcherProps) => {
  return (
    <Dropdown className="w-100 w-md-auto">
      <Dropdown.Toggle className="w-100 w-md-auto" variant="outline-primary">
        <FormattedMessage id="service-contracts.contract_status"></FormattedMessage>:{' '}
        <FormattedMessage id={'service-contracts.' + contract.contract_status}></FormattedMessage>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {statuses.map((item) => (
          <Dropdown.Item key={item.value}>
            <FormattedMessage id="service-contracts.contract_status" />:{' '}
            <FormattedMessage id={'service-contracts.' + item.value}></FormattedMessage>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
