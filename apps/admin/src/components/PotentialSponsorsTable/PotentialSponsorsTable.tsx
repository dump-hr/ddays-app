import React, { useState, useMemo } from 'react';
import { PotentialSponsorDto, Tier, SponsorStatus } from '@ddays-app/types';
import { TableSearch } from '../TableDashboard/TableSearch';
import { TierLabels, StatusLabels } from './labels';
import { usePotentialSponsorUpdate } from '../../api/potential-sponsor/usePotentialSponsorUpdate';
import PlusIcon from '../../assets/icons/plus.svg?react';

import c from './PotentialSponsorsTable.module.scss';

type PotentialSponsorsTableProps = {
  sponsors: PotentialSponsorDto[];
  onRefresh?: () => void;
  renderForm?: (onSuccess: () => void, id?: number) => React.ReactNode;
};

export const PotentialSponsorsTable: React.FC<PotentialSponsorsTableProps> = ({
  sponsors,
  onRefresh,
  renderForm,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [representativeFilter, setRepresentativeFilter] = useState('');
  const [tierFilter, setTierFilter] = useState<Tier | ''>('');
  const [expandedCommentId, setExpandedCommentId] = useState<number | null>(
    null,
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const updateSponsor = usePotentialSponsorUpdate();

  const filteredSponsors = useMemo(() => {
    return sponsors.filter((s) => {
      const matchesCompany = s.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRep =
        representativeFilter === '' ||
        s.representative.toLowerCase() === representativeFilter.toLowerCase();
      const matchesTier = tierFilter === '' || s.tier === tierFilter;
      return matchesCompany && matchesRep && matchesTier;
    });
  }, [sponsors, searchTerm, representativeFilter, tierFilter]);

  const uniqueRepresentatives = Array.from(
    new Set(sponsors.map((s) => s.representative)),
  ).sort();

  const getTierClass = (tier: Tier | undefined) =>
    tier ? c[`tier${tier}`] : '';
  const getStatusClass = (status: SponsorStatus | undefined) =>
    status ? c[`status${status}`] : '';

  const toggleCommentExpand = (id: number) => {
    setExpandedCommentId((prev) => (prev === id ? null : id));
  };

  const handleOpenForm = (id?: number) => {
    setEditId(id ?? null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => setIsFormOpen(false);

  const handleFormSuccess = () => {
    handleCloseForm();
    onRefresh?.();
  };

  const handleTierChange = (id: number, newTier: Tier) => {
    const sponsor = sponsors.find((s) => s.id === id);
    if (!sponsor) return;

    updateSponsor.mutate({
      id,
      company: sponsor.company,
      email: sponsor.email || '',
      representative: sponsor.representative,
      comment: sponsor.comment || '',
      tier: newTier,
      status: sponsor.status,
    });
  };

  const handleStatusChange = (id: number, newStatus: SponsorStatus) => {
    const sponsor = sponsors.find((s) => s.id === id);
    if (!sponsor) return;

    updateSponsor.mutate({
      id,
      company: sponsor.company,
      email: sponsor.email || '',
      representative: sponsor.representative,
      comment: sponsor.comment || '',
      tier: sponsor.tier,
      status: newStatus,
    });
  };

  return (
    <div className={c.tableWrap}>
      <TableSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dataType={'PotentialSponsorDto'}
      />

      <div className={c.filters}>
        <button
          type='button'
          className={c.redButton}
          onClick={() => handleOpenForm()}>
          <PlusIcon className={c.whiteIcon} />
          Dodaj
        </button>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value as Tier | '')}>
          <option value=''>Sve razine</option>
          {Object.values(Tier).map((tier) => (
            <option key={tier} value={tier}>
              {TierLabels[tier]}
            </option>
          ))}
        </select>

        <select
          value={representativeFilter}
          onChange={(e) => setRepresentativeFilter(e.target.value)}>
          <option value=''>Svi predstavnici</option>
          {uniqueRepresentatives.map(
            (item) =>
              item && (
                <option key={item} value={item}>
                  {item}
                </option>
              ),
          )}
        </select>
      </div>

      <table className={c.sponsorsTable}>
        <thead>
          <tr>
            <th>Razina</th>
            <th>Firma</th>
            <th>Email</th>
            <th>Predstavnik</th>
            <th>Komentar</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {filteredSponsors.map((sponsor, index) => {
            const isExpanded = expandedCommentId === sponsor.id;

            return (
              <tr
                key={sponsor.id}
                className={index % 2 === 0 ? c.altRow : undefined}>
                <td>
                  <select
                    className={`${c.tierSelect} ${getTierClass(sponsor.tier as Tier)}`}
                    value={sponsor.tier}
                    onChange={(e) =>
                      handleTierChange(sponsor.id, e.target.value as Tier)
                    }>
                    {Object.values(Tier).map((tier) => (
                      <option key={tier} value={tier}>
                        {TierLabels[tier]}
                      </option>
                    ))}
                  </select>
                </td>

                <td>{sponsor.company}</td>
                <td>{sponsor.email}</td>
                <td>{sponsor.representative}</td>

                <td className={c.commentCell}>
                  {sponsor.comment ? (
                    <>
                      <span
                        className={c.commentPreview}
                        onClick={() => toggleCommentExpand(sponsor.id)}>
                        {sponsor.comment.length > 20 && !isExpanded
                          ? sponsor.comment.slice(0, 20) + '...'
                          : sponsor.comment}
                      </span>
                      {isExpanded && (
                        <div
                          className={c.commentExpanded}
                          onClick={() => toggleCommentExpand(sponsor.id)}>
                          {sponsor.comment}
                        </div>
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </td>

                <td>
                  <select
                    className={`${c.statusSelect} ${getStatusClass(sponsor.status as SponsorStatus)}`}
                    value={sponsor.status}
                    onChange={(e) =>
                      handleStatusChange(
                        sponsor.id,
                        e.target.value as SponsorStatus,
                      )
                    }>
                    {Object.values(SponsorStatus).map((status) => (
                      <option key={status} value={status}>
                        {StatusLabels[status]}
                      </option>
                    ))}
                  </select>
                </td>

                <td className={c.actionsCell}>
                  <button
                    onClick={() => {
                      handleOpenForm(sponsor.id);
                    }}>
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isFormOpen && renderForm && (
        <div className={c.modalBackdrop} onClick={handleCloseForm}>
          <div className={c.modalContent} onClick={(e) => e.stopPropagation()}>
            {renderForm(handleFormSuccess, editId ?? undefined)}
          </div>
        </div>
      )}
    </div>
  );
};
