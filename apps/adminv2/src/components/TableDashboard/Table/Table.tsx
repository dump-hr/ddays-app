import React from 'react';
import c from './Table.module.scss';
import { DataRow } from '../../../types/table';

type DataTableProps = {
  columns: string[];
  data: DataRow[];
  selected: number[];
  onCheckAll: () => void;
  onCheckboxChange: (id: number) => void;
  getDataType: (value: string | number | boolean | Date) => string;
};

export const Table: React.FC<DataTableProps> = ({
  columns,
  data,
  selected,
  onCheckAll,
  onCheckboxChange,
  getDataType,
}) => {
  return (
    <div className={c.tableWrap}>
      <table className={c.table}>
        <colgroup>
          <col className={c.checkboxCol} style={{ width: '48px' }} />
          {columns.map((c) => (
            <col key={c} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th className={c.checkboxCol}>
              <input
                type='checkbox'
                className={c.checkbox}
                onChange={onCheckAll}
                checked={selected.length === data.length && data.length > 0}
              />
            </th>
            {columns.map((col) => (
              <th key={col}>
                <div className={c.headerCell}>
                  <div className={c.dataType}>
                    {data.length > 0 ? getDataType(data[0][col]) : '-'}
                  </div>
                  <div className={c.colName}>{col}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className={c.noData}>
                Nema podataka za prikaz.
              </td>
            </tr>
          ) : (
            data.slice(0, 200).map((row, i) => {
              const rowId = row.Id ?? row.id ?? row.ID;

              return (
                <tr
                  key={rowId}
                  className={`${i % 2 === 0 ? c.altRow : ''} ${
                    selected.includes(rowId) ? c.checkedRow : ''
                  }`}>
                  <td className={c.checkboxCol}>
                    <input
                      type='checkbox'
                      className={c.checkbox}
                      checked={selected.includes(rowId)}
                      onChange={() => onCheckboxChange(rowId)}
                    />
                  </td>
                  {columns.map((col) => {
                    const val = row[col];
                    if (typeof val === 'boolean') {
                      return (
                        <td key={col}>
                          <span
                            className={`${c.booleanBadge} ${
                              val ? c.booleanTrue : c.booleanFalse
                            }`}>
                            {String(val)}
                          </span>
                        </td>
                      );
                    }
                    return <td key={col}>{val}</td>;
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
