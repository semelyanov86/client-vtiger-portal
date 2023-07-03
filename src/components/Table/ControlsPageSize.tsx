import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

interface ControlsPageSizeProps {
  onSelectPageSize: (size: number) => void;
  pageSize: number;
}

export const ControlsPageSize = ({ onSelectPageSize, pageSize }: ControlsPageSizeProps) => {
  const options = [5, 10, 20];

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
        <Dropdown className="d-inline-block" align="end" data-testid="controls-page-size">
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
                onClick={() => {
                  onSelectPageSize(pSize);
                }}
              >
                {pSize} <FormattedMessage id="general.items"></FormattedMessage>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </OverlayTrigger>
  );
};
