import React, { useEffect, useRef } from 'react';
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
import { TableInstance } from 'react-table';

import HelpDesk from '../../features/help-desk/types';

interface ButtonsCheckAllProps {
  tableInstance: TableInstance<HelpDesk>;
}

export const ButtonsCheckAll = ({ tableInstance }: ButtonsCheckAllProps) => {
  const checkAllRef = useRef<HTMLInputElement>(null);
  const {
    getToggleAllPageRowsSelectedProps,
    setData,
    data,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;
  const { onChange, checked, indeterminate } = getToggleAllPageRowsSelectedProps();

  useEffect(() => {
    if (checkAllRef.current) {
      if (indeterminate === undefined) {
        checkAllRef.current.indeterminate = false;
      } else {
        checkAllRef.current.indeterminate = indeterminate;
      }
    }
    return () => {};
  }, [indeterminate]);

  const deleteSelectedItems = () => {
    setData(data.filter((_: any, index: number) => !selectedRowIds[index]));
  };

  const changeTagSelectedItems = (tag: string) => {
    const newData = data.map((x: any, index: number) => {
      if (selectedRowIds[index]) {
        return { ...x, tag };
      }
      return x;
    });
    setData(newData);
  };

  const handleButtonClick = () => {
    const fakeEvent = {
      target: {
        checked: !checked,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    if (onChange) {
      onChange(fakeEvent);
    }
  };

  return (
    <div className="">
      <Dropdown drop="down" as={ButtonGroup} className="ms-1 check-all-container" align="end">
        <Button
          variant="outline-primary"
          className="btn-custom-control p-0 ps-3 pe-2"
          onClick={handleButtonClick}
        >
          <Form.Check
            ref={checkAllRef}
            className="form-check float-end pt-0"
            type="checkbox"
            checked={checked}
            onChange={() => {}}
          />
        </Button>
        <Dropdown.Toggle split as={Button} variant="outline-primary" className="" />
        <Dropdown.Menu
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
          <Dropdown drop="start" className="dropdown-submenu">
            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('Done');
                }}
              >
                Done
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('New');
                }}
              >
                New
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('Sale');
                }}
              >
                Sale
              </Dropdown.Item>
            </Dropdown.Menu>
            <Dropdown.Toggle variant="link" disabled={selectedFlatRows.length === 0}>
              Tag
            </Dropdown.Toggle>
          </Dropdown>
          <Dropdown.Item
            href="#/action"
            disabled={selectedFlatRows.length === 0}
            onClick={deleteSelectedItems}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
