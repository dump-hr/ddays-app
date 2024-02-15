import { useState } from 'react';

import { unCamelCase } from '../../helpers';
import { Button } from '../Button';
import c from './Table.module.scss';

type TableProps<T> = {
  data?: T[];
  actions?: {
    label: string | ((row: T) => string);
    action: (row: T) => void;
    isDisabled?: (row: T) => boolean;
  }[];
};

type SlicedParagraphProps = {
  text: string;
  clipLength: number;
};

export const Table = <T extends object>({
  data = [],
  actions = [],
}: TableProps<T>) => {
  if (!data.length) return null;

  const transformValue = (value: unknown) => {
    if (value === undefined) {
      return '[undefined]';
    }
    if (value === null) {
      return '[null]';
    }
    // TODO: format date
    // TODO: format boolean
    return value.toString();
  };

  function SlicedParagraph({ text, clipLength }: SlicedParagraphProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (text.length < clipLength) return text;

    if (isExpanded) {
      return (
        <>
          {text}
          <br />
          <a onClick={() => setIsExpanded(false)} className={c.showMore}>
            show less
          </a>
        </>
      );
    } else {
      return (
        <>
          {text.slice(0, 40).trim() + '...'}
          <br />
          <a onClick={() => setIsExpanded(true)} className={c.showMore}>
            show more
          </a>
        </>
      );
    }
  }

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
          <tr key={i}>
            {Object.values(row).map((value, i) => (
              <td className={c.td} key={i}>
                <SlicedParagraph text={transformValue(value)} clipLength={50} />
              </td>
            ))}
            <td className={c.actions}>
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
