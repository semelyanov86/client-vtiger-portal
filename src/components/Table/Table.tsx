import classNames from 'classnames';
import { TableInstance } from 'react-table';

import HelpDesk from '../../features/help-desk/types';

interface TableProps {
  tableInstance: TableInstance<HelpDesk>;
  className?: string;
}

export const Table = ({ tableInstance, className = 'react-table boxed' }: TableProps) => {
  const {
    getTableProps,
    headerGroups,
    page,
    getTableBodyProps,
    prepareRow,
    toggleAllPageRowsSelected,
    setIsOpenAddEditModal,
  } = tableInstance;

  return (
    <table className={className} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, headerIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={`header${headerIndex}`}>
            {headerGroup.headers.map((column, index) => {
              return (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`th.${index}`}
                  className={classNames(column.headerClassName, {
                    sorting_desc: column.isSortedDesc,
                    sorting_asc: column.isSorted && !column.isSortedDesc,
                    sorting: column.sortable,
                  })}
                >
                  {column.render('Header')}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              key={`tr.${i}`}
              className={classNames({ selected: row.isSelected })}
            >
              {row.cells.map((cell, cellIndex) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <td
                  {...cell.getCellProps()}
                  key={`td.${cellIndex}`}
                  onClick={() => {
                    if (cell.column.id === 'ticket_no') {
                      toggleAllPageRowsSelected(false);
                      row.toggleRowSelected();
                      setIsOpenAddEditModal(true);
                    } else {
                      row.toggleRowSelected();
                    }
                  }}
                  onKeyDown={(e) => {
                    // Add a keyboard event listener
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (cell.column.id === 'ticket_no') {
                        toggleAllPageRowsSelected(false);
                        row.toggleRowSelected();
                        setIsOpenAddEditModal(true);
                      } else {
                        row.toggleRowSelected();
                      }
                    }
                  }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
