import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { TableInstance } from 'react-table';

import HelpDesk from '../../features/help-desk/types';

interface ControlsPageSizeProps {
  tableInstance: TableInstance<HelpDesk>;
}

export const ControlsPageSize = ({ tableInstance }: ControlsPageSizeProps) => {
  const {
    setPageSize,
    gotoPage,
    state: { pageSize },
  } = tableInstance;
  const options = [5, 10, 20];

  const onSelectPageSize = (size: number) => {
    setPageSize(size);
    gotoPage(0);
  };
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 1000, hide: 0 }}
      overlay={
        <Tooltip>
          <FormattedMessage id="general.item-count" />
        </Tooltip>
      }
    >
      {({ ref, ...triggerHandler }) => (
        <Dropdown className="d-inline-block" align="end">
          <Dropdown.Toggle
            ref={ref}
            {...triggerHandler}
            variant="foreground-alternate"
            className="shadow"
          >
            {pageSize} <FormattedMessage id="general.items" />
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="shadow dropdown-menu-end"
            popperConfig={{
              modifiers: [
                {
                  name: 'computeStyles',
                  options: {
                    gpuAcceleration: false,
                  },
                },
              ],
            }}
          >
            {options.map((pSize) => (
              <Dropdown.Item
                key={`pageSize.${pSize}`}
                active={pSize === pageSize}
                onSelect={() => onSelectPageSize(pSize)}
              >
                {pSize} Items
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </OverlayTrigger>
  );
};
