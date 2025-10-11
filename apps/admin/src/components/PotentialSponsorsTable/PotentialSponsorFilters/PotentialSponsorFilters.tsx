import { useState } from 'react';
import type { FC } from 'react';
import { Tier } from '@ddays-app/types';
import PlusIcon from '@/assets/icons/plus.svg?react';
import { TierLabels } from '../labels';

import c from '../PotentialSponsorsTable.module.scss';

type PotentialSponsorsFiltersProps = {
  onAdd?: () => void;
  tierFilter?: Tier | undefined;
  onTierChange?: (value: Tier | undefined) => void;
  representativeFilter?: string | undefined;
  onRepresentativeChange?: (value: string | undefined) => void;
  uniqueRepresentatives?: string[];
  onAssignRepresentative?: (
    start: number,
    end: number,
    representative: string,
  ) => void;
};

export const PotentialSponsorsFilters: FC<PotentialSponsorsFiltersProps> = ({
  onAdd,
  tierFilter,
  onTierChange,
  representativeFilter,
  onRepresentativeChange,
  uniqueRepresentatives,
  onAssignRepresentative,
}) => {
  const [assignState, setAssignState] = useState({
    showInputs: false,
    startRow: '',
    endRow: '',
    repName: '',
  });

  const handleChange = (
    field: keyof typeof assignState,
    value: string | boolean,
  ) => {
    setAssignState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAssignClick = () => {
    const start = parseInt(assignState.startRow);
    const end = parseInt(assignState.endRow);
    if (!start || !end || !assignState.repName) return;
    onAssignRepresentative?.(start, end, assignState.repName);
    setAssignState({
      showInputs: false,
      startRow: '',
      endRow: '',
      repName: '',
    });
  };

  return (
    <div className={c.filters}>
      {onAdd && (
        <button type='button' className={c.redButton} onClick={onAdd}>
          <PlusIcon className={c.whiteIcon} />
          Dodaj
        </button>
      )}

      {onTierChange && (
        <select
          value={tierFilter ?? ''}
          onChange={(e) =>
            onTierChange(
              e.target.value === '' ? undefined : (e.target.value as Tier),
            )
          }>
          <option value=''>Sve razine</option>
          {Object.values(Tier).map((tier) => (
            <option key={tier} value={tier}>
              {TierLabels[tier]}
            </option>
          ))}
        </select>
      )}

      {onRepresentativeChange && (
        <select
          value={representativeFilter ?? ''}
          onChange={(e) =>
            onRepresentativeChange(
              e.target.value === '' ? undefined : e.target.value,
            )
          }>
          <option value=''>Svi predstavnici</option>
          {uniqueRepresentatives?.map(
            (rep) =>
              rep && (
                <option key={rep} value={rep}>
                  {rep}
                </option>
              ),
          )}
        </select>
      )}

      {onAssignRepresentative && (
        <button
          type='button'
          className={c.redButton}
          style={{ padding: '12px 12px' }}
          onClick={() => handleChange('showInputs', !assignState.showInputs)}>
          Dodijeli predstavnika
        </button>
      )}

      {assignState.showInputs && (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type='number'
            placeholder='Start row'
            value={assignState.startRow}
            onChange={(e) => handleChange('startRow', e.target.value)}
          />
          <input
            type='number'
            placeholder='End row'
            value={assignState.endRow}
            onChange={(e) => handleChange('endRow', e.target.value)}
          />
          <input
            type='text'
            placeholder='Predstavnik'
            value={assignState.repName}
            onChange={(e) => handleChange('repName', e.target.value)}
          />
          <button
            type='button'
            className={c.redButton}
            style={{ padding: '12px 12px' }}
            onClick={handleAssignClick}>
            Potvrdi
          </button>
        </div>
      )}
    </div>
  );
};
