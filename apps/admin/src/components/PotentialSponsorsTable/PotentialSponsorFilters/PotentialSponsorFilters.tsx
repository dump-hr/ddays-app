import React, { useState } from 'react';
import { Tier } from '@ddays-app/types';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import { TierLabels } from '../labels';

import c from '../PotentialSponsorsTable.module.scss';

type PotentialSponsorsFiltersProps = {
  onAdd?: () => void;
  tierFilter?: Tier | '';
  onTierChange?: (value: Tier | '') => void;
  representativeFilter?: string;
  onRepresentativeChange?: (value: string) => void;
  uniqueRepresentatives?: string[];
  onAssignRepresentative?: (
    start: number,
    end: number,
    representative: string,
  ) => void;
};

export const PotentialSponsorsFilters: React.FC<
  PotentialSponsorsFiltersProps
> = ({
  onAdd,
  tierFilter,
  onTierChange,
  representativeFilter,
  onRepresentativeChange,
  uniqueRepresentatives,
  onAssignRepresentative,
}) => {
  const [showAssignInputs, setShowAssignInputs] = useState(false);
  const [startRow, setStartRow] = useState('');
  const [endRow, setEndRow] = useState('');
  const [repName, setRepName] = useState('');

  const handleAssignClick = () => {
    const start = parseInt(startRow);
    const end = parseInt(endRow);
    if (!start || !end || !repName) return;
    onAssignRepresentative?.(start, end, repName);
    setStartRow('');
    setEndRow('');
    setRepName('');
    setShowAssignInputs(false);
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
          value={tierFilter}
          onChange={(e) => onTierChange?.(e.target.value as Tier | '')}>
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
          value={representativeFilter}
          onChange={(e) => onRepresentativeChange?.(e.target.value)}>
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
          onClick={() => setShowAssignInputs((prev) => !prev)}>
          Dodijeli predstavnika
        </button>
      )}

      {showAssignInputs && (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type='number'
            placeholder='Start row'
            value={startRow}
            onChange={(e) => setStartRow(e.target.value)}
          />
          <input
            type='number'
            placeholder='End row'
            value={endRow}
            onChange={(e) => setEndRow(e.target.value)}
          />
          <input
            type='text'
            placeholder='Predstavnik'
            value={repName}
            onChange={(e) => setRepName(e.target.value)}
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
