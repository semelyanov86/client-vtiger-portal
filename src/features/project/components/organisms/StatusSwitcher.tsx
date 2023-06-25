import { Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { Project } from '../../types';

interface StatusSwitcherProps {
  statuses: { label: string; value: string }[];
  project: Project;
}

export const StatusSwitcher = ({ statuses, project }: StatusSwitcherProps) => {
  return (
    <Dropdown className="w-100 w-md-auto">
      <Dropdown.Toggle className="w-100 w-md-auto" variant="outline-primary">
        <FormattedMessage id="project.projectstatus"></FormattedMessage>: {project.projectstatus}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {statuses.map((item) => (
          <Dropdown.Item key={item.value}>
            <FormattedMessage id="project.projectstatus" />:{' '}
            <FormattedMessage id={'project.' + item.value}></FormattedMessage>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
