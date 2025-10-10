import React from 'react';
import c from './ReusableTable.module.scss';

export type CellType = 'text' | 'select' | 'checkbox' | 'custom';

export interface ColumnConfig<T> {
  key: keyof T | string;
  label: string;
  cellType: CellType;
  className?: string;
  options?: { label: string; value: string }[];
  renderCustom?: (row: T, index: number) => React.ReactNode;
  onChange?: (row: T, value: any) => void;
}

interface ReusableTableProps<T extends object> {
  data: T[];
  columns: ColumnConfig<T>[];
  rowKey: keyof T;
  getRowClass?: (row: T, index: number) => string | undefined;
}

export function ReusableTable<T extends object>({
  data,
  columns,
  rowKey,
  getRowClass,
}: ReusableTableProps<T>) {
  return (
    <table className={c.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key.toString()} className={col.className}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={(row[rowKey] as string | number).toString()}
            className={getRowClass?.(row, index)}>
            {columns.map((col) => {
              const value = col.key in row ? (row as any)[col.key] : null;

              switch (col.cellType) {
                case 'text':
                  return (
                    <td key={col.key.toString()} className={col.className}>
                      {value}
                    </td>
                  );

                case 'select':
                  return (
                    <td key={col.key.toString()} className={col.className}>
                      <select
                        value={value ?? ''}
                        onChange={(e) => col.onChange?.(row, e.target.value)}>
                        {col.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  );

                case 'checkbox':
                  return (
                    <td key={col.key.toString()} className={col.className}>
                      <input
                        type='checkbox'
                        checked={!!value}
                        onChange={(e) => col.onChange?.(row, e.target.checked)}
                      />
                    </td>
                  );

                case 'custom':
                  return (
                    <td key={col.key.toString()} className={col.className}>
                      {col.renderCustom?.(row, index)}
                    </td>
                  );

                default:
                  return <td key={col.key.toString()}>{value}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
