import { SponsorContractDto, SponsorContractModifyDto } from '@ddays-app/types';
import { useSponsorContractsUpdate } from '../../api/sponsor-contracts/useSponsorContractsUpdate';
import c from '../PotentialSponsorsTable/PotentialSponsorsTable.module.scss';
import React from 'react';
import { tableColumns } from './tableColumnsContracts';

type SponsorContractsTableProps = {
  contracts: SponsorContractDto[];
  onEdit?: (id?: number) => void;
};

const OPTIONS = [
  { value: '', label: '-' },
  { value: 'yes', label: '✅' },
];

export const SponsorContractsTable = ({
  contracts,
  onEdit,
}: SponsorContractsTableProps) => {
  const updateSponsorContracts = useSponsorContractsUpdate();

  const renderSelectCell = (
    contract: SponsorContractDto,
    colKey: keyof SponsorContractModifyDto,
  ) => {
    const state = contract[colKey];
    const value = state === true ? 'yes' : '';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value === 'yes';

      handleContractsChange(contract.id, {
        ...contract,
        name: contract.name ?? '',
        address: contract.address ?? '',
        oib: contract.oib ?? '',
        companyRepresentative: contract.companyRepresentative ?? '',
        companyRepresentativePosition:
          contract.companyRepresentativePosition ?? '',
        [colKey]: newValue,
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

  const renderTextCell = (
    contract: SponsorContractDto,
    colKey: string,
    index: number,
  ) => {
    switch (colKey) {
      case 'number':
        return <td>{index + 1}</td>;
      case 'company':
        return <td>{contract.potentialSponsor?.company}</td>;

      case 'representative':
        return <td>{contract.potentialSponsor?.representative}</td>;

      default:
        return (
          <td>
            {
              contract[colKey as keyof SponsorContractDto] as
                | string
                | number
                | null
            }
          </td>
        );
    }
  };

  const handleContractsChange = (
    id: number,
    newContracts: SponsorContractModifyDto,
  ) => {
    updateSponsorContracts.mutate({ id, ...newContracts });
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
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr
              key={contract.id}
              className={index % 2 === 0 ? c.altRow : undefined}>
              {tableColumns.map((col) =>
                col.small
                  ? renderSelectCell(
                      contract,
                      col.key as keyof SponsorContractModifyDto,
                    )
                  : renderTextCell(contract, col.key, index),
              )}

              <td className={c.actionsCell}>
                <button onClick={() => onEdit?.(contract.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
