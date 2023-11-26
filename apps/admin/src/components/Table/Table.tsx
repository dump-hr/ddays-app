import Button from "../Button";
import c from "./Table.module.scss";

type TableProps = {
  headers: string[];
  data: object[];
};

const Table: React.FC<TableProps> = ({ headers, data }) => {
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
              <td>
                <Button variant="secondary">Uredi</Button>
              </td>
              <td>
                <Button variant="secondary">Izbriši</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
