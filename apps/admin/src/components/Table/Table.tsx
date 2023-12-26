import Button from '../Button';
import c from './Table.module.scss';

type TableProps<T> = {
  headers: string[];
  data: T[] | undefined;
  buttonActions?: {
    label: string;
    action: (row: T) => void;
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
                        onClick={() => action.action(row)}
                        key={i}>
                        {action.label}
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