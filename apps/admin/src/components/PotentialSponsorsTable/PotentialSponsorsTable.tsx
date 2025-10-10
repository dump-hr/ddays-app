import React, { useState } from 'react';
import { PotentialSponsorDto, Tier, SponsorStatus } from '@ddays-app/types';
import { TierLabels, StatusLabels } from './labels';
import { usePotentialSponsorUpdate } from '../../api/potential-sponsor/usePotentialSponsorUpdate';
import { useSponsorMaterialsCreate } from '../../api/sponsor-materials/useSponsorMaterialsCreate';

import c from './PotentialSponsorsTable.module.scss';

type PotentialSponsorsTableProps = {
  sponsors: PotentialSponsorDto[];
  onEdit?: (id?: number) => void;
};

export const PotentialSponsorsTable: React.FC<PotentialSponsorsTableProps> = ({
  sponsors,
  onEdit,
}) => {
  const [expandedCommentId, setExpandedCommentId] = useState<number | null>(
    null,
  );

  const updateSponsor = usePotentialSponsorUpdate();
  const createSponsorMaterial = useSponsorMaterialsCreate();

  const getTierClass = (tier: Tier | undefined) =>
    tier ? c[`tier${tier}`] : '';
  const getStatusClass = (status: SponsorStatus | undefined) =>
    status ? c[`status${status}`] : '';

  const toggleCommentExpand = (id: number) => {
    setExpandedCommentId((prev) => (prev === id ? null : id));
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

    if (newStatus === SponsorStatus.AGREED) {
      createSponsorMaterial.mutate({
        sponsorId: id,
      });
    }
  };

  return (
    <div className={c.tableWrap}>
      <table className={c.sponsorsTable}>
        <thead>
          <tr>
            <th className={c.numberCol}>#</th>
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
          {sponsors.map((sponsor, index) => {
            const isExpanded = expandedCommentId === sponsor.id;

            return (
              <tr
                key={sponsor.id}
                className={index % 2 === 0 ? c.altRow : undefined}>
                <td>{index + 1}</td>
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
                    className={`${c.statusSelect} ${getStatusClass(
                      sponsor.status as SponsorStatus,
                    )}`}
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
                  <button onClick={() => onEdit?.(sponsor.id)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
