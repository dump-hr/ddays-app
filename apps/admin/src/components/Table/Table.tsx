import c from './Table.module.scss';
import Button from '../Button';

type TableProps = {
  headers: string[];
  data: object[];
  buttonActions?: {
    label: string;
    action: (row: object) => void;
  }[];
};

const Table: React.FC<TableProps> = ({ headers, data, buttonActions = [] }) => {
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
        {data.map((row, i) => {
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
};

export default Table;
