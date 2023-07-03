import { useState } from 'react';
import { XSquareFill, Search } from 'react-bootstrap-icons';
import { TableInstance } from 'react-table';

interface ControlsSearchProps<T extends object> {
  tableInstance: TableInstance<T>;
  onChange: (value: string) => void;
}

export const ControlsSearch = <T extends object>({
  tableInstance,
  onChange,
}: ControlsSearchProps<T>) => {
  const {
    state: { globalFilter },
  } = tableInstance;

  const [value, setValue] = useState(globalFilter);

  return (
    <>
      <input
        className="form-control datatable-search"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Search"
        data-testid="search-input"
      />
      {value && value.length > 0 ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <span
          className="search-delete-icon"
          onClick={() => {
            setValue('');
            onChange('');
          }}
          data-testid="search-delete-icon"
        >
          <XSquareFill></XSquareFill>
        </span>
      ) : (
        <span className="search-magnifier-icon pe-none">
          <Search></Search>
        </span>
      )}
    </>
  );
};
