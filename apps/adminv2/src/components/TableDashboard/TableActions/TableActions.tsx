import React from 'react';
import a from './TableActions.module.scss';
import PlusIcon from '@/assets/icons/plus.svg?react';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import SortIcon from '@/assets/icons/sort.svg?react';

type TableActionsProps = {
  selectedCount: number;
  totalCount: number;
  onSort: () => void;
};

export const TableActions: React.FC<TableActionsProps> = ({
  selectedCount,
  totalCount,
  onSort,
}) => {
  return (
    <div className={a.actions}>
      <div className={a.leftButtons}>
        <button type='button' className={a.redButton}>
          <PlusIcon className={a.whiteIcon} />
          Dodaj
        </button>
        <button type='button'>
          <PlusIcon />
          Izvezi
        </button>
        <button type='button' className={a.redOutline}>
          <RefreshIcon className={a.redIcon} />
          Osvježi
        </button>
        <button type='button' onClick={onSort}>
          <SortIcon />
          Sortiraj
        </button>
        <div className={a.selectedCount}>{selectedCount} odabrano</div>
      </div>
      <div className={a.totalCount}>Ukupno: {totalCount}</div>
    </div>
  );
};
