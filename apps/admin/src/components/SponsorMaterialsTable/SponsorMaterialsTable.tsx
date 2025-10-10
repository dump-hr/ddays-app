import {
  SponsorMaterialsDto,
  SponsorMaterialsModifyDto,
  Tier,
} from '@ddays-app/types';
import c from '../PotentialSponsorsTable/PotentialSponsorsTable.module.scss';
import { TierLabels } from '../PotentialSponsorsTable/labels';
import { useSponsorMaterialsUpdate } from '../../api/sponsor-materials/useSponsorMaterialsUpdate';
import { tableColumns } from './tableColumns';
import React from 'react';

type SponsorMaterialsTableProps = {
  materials: SponsorMaterialsDto[];
};

const OPTIONS = [
  { value: '', label: '-' },
  { value: 'yes', label: '✅' },
  { value: 'no', label: '❌' },
];

export const SponsorMaterialsTable = ({
  materials,
}: SponsorMaterialsTableProps) => {
  const updateSponsorMaterials = useSponsorMaterialsUpdate();

  const getTierClass = (tier: Tier | undefined) =>
    tier ? c[`tier${tier}`] : '';

  const renderSelectCell = (
    material: SponsorMaterialsDto,
    colKey: keyof SponsorMaterialsModifyDto,
  ) => {
    const value =
      material[colKey] === true
        ? 'yes'
        : material[colKey] === false
          ? 'no'
          : '';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      const updateValue = newValue === 'yes';

      handleMaterialsChange(material.id, {
        ...material,
        [colKey]: updateValue,
        notes: material.notes ?? '',
      });
    };

    return (
      <td className={c.smallCell}>
        <select className={c.smallSelect} value={value} onChange={handleChange}>
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </td>
    );
  };

  const handleMaterialsChange = (
    id: number,
    newMaterials: SponsorMaterialsModifyDto,
  ) => {
    updateSponsorMaterials.mutate({ id, ...newMaterials });
  };

  return (
    <div className={c.tableWrap}>
      <table className={c.sponsorsTable}>
        <thead>
          <tr>
            {tableColumns.map((col) => (
              <th
                key={col.key}
                className={col.small ? c.smallCell : col.className}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr
              key={material.id}
              className={index % 2 === 0 ? c.altRow : undefined}>
              <td>{index + 1}</td>
              <td className={c.tierCellInMaterials}>
                <div
                  className={`${getTierClass(
                    material.potentialSponsor?.tier as Tier,
                  )} ${c.tierInMaterials}`}>
                  {TierLabels[material.potentialSponsor?.tier as Tier]}
                </div>
              </td>
              <td>{material.potentialSponsor?.company}</td>
              <td>{material.potentialSponsor?.representative}</td>

              {tableColumns
                .filter((col) => col.small)
                .map((col, i) => (
                  <React.Fragment key={i}>
                    {renderSelectCell(
                      material,
                      col.key as keyof SponsorMaterialsModifyDto,
                    )}
                  </React.Fragment>
                ))}

              <td>
                <textarea className={c.notesInput} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
