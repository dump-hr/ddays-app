import { isValidHttpUrl, unCamelCase } from '../../helpers';
import { Button } from '../Button';
import { SlicedParagraph } from '../SlicedParagraph';
import c from './Table.module.scss';

type TableProps<T> = {
  data?: T[];
  actions?: {
    label: string | ((row: T) => string);
    action: (row: T) => void;
    isDisabled?: (row: T) => boolean;
  }[];
};

export const Table = <T extends object>({
  data = [],
  actions = [],
}: TableProps<T>) => {
  if (!data.length) return null;

  const transformValue = (rawvalue: unknown) => {
    if (rawvalue === undefined) {
      return <span>[undefined]</span>;
    }

    if (rawvalue === null) {
      return <span>[null]</span>;
    }

    const value = rawvalue.toString();

    if (isValidHttpUrl(value)) {
      return (
        <a href={value} target='_blank'>
          {value}
        </a>
      );
    }

    // TODO: format date
    // TODO: format boolean

    return <SlicedParagraph text={value} clipLength={50} />;
  };

  return (
    <table className={c.table}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th className={c.th} key={key}>
              {unCamelCase(key)}
            </th>
          ))}
          {actions.length > 0 && <th className={c.th}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr className={c.tr} key={i}>
            {Object.values(row).map((value, i) => (
              <td className={c.td} key={i}>
                {transformValue(value)}
              </td>
            ))}
            <td className={c.td}>
              <div className={c.actions}>
                {actions.map((action, i) => (
                  <Button
                    variant='secondary'
                    disabled={action.isDisabled?.(row)}
                    onClick={() => action.action(row)}
                    key={i}>
                    {typeof action.label === 'function'
                      ? action.label(row)
                      : action.label}
                  </Button>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
