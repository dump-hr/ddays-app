import React from 'react';
import c from './TableActions.module.scss';
import PlusIcon from '@/assets/icons/plus.svg?react';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import SortIcon from '@/assets/icons/sort.svg?react';
import ExportIcon from '@/assets/icons/export.svg?react';
type TableActionsProps = {
  selectedCount: number;
  totalCount: number;
  onSort: () => void;
  onRefresh?: () => void;
  onCreateNew?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: () => void; // NEW: printing
};

export const TableActions: React.FC<TableActionsProps> = ({
  selectedCount,
  totalCount,
  onSort,
  onRefresh,
  onCreateNew,
  onEdit,
  onDelete,
  onPrint, // NEW
}) => {
  return (
    <div className={c.actions}>
      <div className={c.leftGroup}>
        <button type='button' className={c.redButton} onClick={onCreateNew}>
          <PlusIcon className={c.whiteIcon} />
          Dodaj
        </button>

        <button type='button' className={c.grayButton}>
          <ExportIcon />
          Izvezi
        </button>
      </div>

      <div className={c.rightGroup}>
        <button type='button' className={c.redOutline} onClick={onRefresh}>
          <RefreshIcon className={c.redIcon} />
          Osvježi
        </button>

        <button type='button' className={c.defaultButton} onClick={onSort}>
          <SortIcon />
          Sortiraj
        </button>

        {onEdit && (
          <button
            type='button'
            className={c.defaultButton}
            onClick={onEdit}
            disabled={selectedCount !== 1}>
            Uredi
          </button>
        )}

        {onDelete && (
          <button
            type='button'
            className={c.redOutline}
            onClick={onDelete}
            disabled={selectedCount === 0}>
            Obriši
          </button>
        )}

        {onPrint && (
          <button
            type='button'
            className={c.defaultButton}
            onClick={onPrint}
            disabled={selectedCount !== 1}>
            Print
          </button>
        )}

        <div className={c.selectedCount}>{selectedCount} odabrano</div>
      </div>
      <div className={c.totalCount}>{totalCount} rezultata</div>
    </div>
  );
};
