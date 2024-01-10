import Button from '../Button';
import c from './Table.module.scss';

type TableProps<T> = {
  headers: string[];
  data: T[] | undefined;
  buttonActions?: {
    label: string | ((row: T) => string);
    action: (row: T) => void;
    isDisabled?: (row: T) => boolean;
  }[];
};

const Table = <T extends object>({
  headers,
  data,
  buttonActions = [],
}: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => {
            return (
              <th className={c.th} key={header}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {!!data &&
          data.map((row, i) => {
            return (
              <tr key={i}>
                {Object.values(row).map((value, i) => {
                  return (
                    <td className={c.td} key={i}>
                      {value}
                    </td>
                  );
                })}
                <td className={c.buttonActions}>
                  {buttonActions.map((action, i) => {
                    return (
                      <Button
                        variant='secondary'
                        disabled={action.isDisabled?.(row)}
                        onClick={() => action.action(row)}
                        key={i}>
                        {typeof action.label === 'function'
                          ? action.label(row)
                          : action.label}
                      </Button>
                    );
                  })}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
