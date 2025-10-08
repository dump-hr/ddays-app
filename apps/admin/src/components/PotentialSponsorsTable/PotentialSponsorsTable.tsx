import React, { useState, useMemo } from 'react';
import { PotentialSponsorDto, Tier, SponsorStatus } from '@ddays-app/types';
import c from './PotentialSponsorsTable.module.scss';
import { TableSearch } from '../TableDashboard/TableSearch';

type PotentialSponsorsTableProps = {
  sponsors: PotentialSponsorDto[];
  onUpdate: (updatedSponsor: PotentialSponsorDto) => void;
};

const TierLabels: Record<Tier, string> = {
  [Tier.DEFAULT]: '-',
  [Tier.BRONZE]: 'Brončani',
  [Tier.SILVER]: 'Srebrni',
  [Tier.GOLD]: 'Zlatni',
};

const StatusLabels: Record<SponsorStatus, string> = {
  [SponsorStatus.DID_NOT_CONTACT]: 'Nismo kontaktirali',
  [SponsorStatus.DISCARDED]: 'Odbijeni',
  [SponsorStatus.ZERO_PING]: 'Nulti ping',
  [SponsorStatus.FIRST_PING]: 'Prvi ping',
  [SponsorStatus.SECOND_PING]: 'Drugi ping',
  [SponsorStatus.MEETING_DONE]: 'Sastanak obavljen',
  [SponsorStatus.INTERESTED]: 'Zainteresirani',
  [SponsorStatus.FOLLOW_UP]: 'Naknadno javljanje',
  [SponsorStatus.AGREED]: 'Dogovoreno',
};

export const PotentialSponsorsTable: React.FC<PotentialSponsorsTableProps> = ({
  sponsors,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedCommentId, setExpandedCommentId] = useState<number | null>(
    null,
  );
  const [formState, setFormState] = useState<
    Record<number, Partial<PotentialSponsorDto>>
  >({});
  const [searchTerm, setSearchTerm] = useState('');
  const [representativeFilter, setRepresentativeFilter] = useState('');
  const [tierFilter, setTierFilter] = useState<Tier | ''>('');

  const handleEditClick = (sponsor: PotentialSponsorDto) => {
    setEditingId(sponsor.id);
    setFormState((prev) => ({ ...prev, [sponsor.id]: sponsor }));
  };

  const handleInputChange = (
    sponsorId: number,
    field: keyof PotentialSponsorDto,
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [sponsorId]: { ...prev[sponsorId], [field]: value },
    }));
    if (field === 'tier' || field === 'status') {
      const updated = {
        ...sponsors.find((s) => s.id === sponsorId)!,
        [field]: value,
      };
      onUpdate(updated);
    }
  };

  const handleSave = (sponsorId: number) => {
    if (editingId !== null) {
      const updatedSponsor = {
        ...sponsors.find((s) => s.id === sponsorId)!,
        ...formState[sponsorId],
      };
      onUpdate(updatedSponsor);
      setEditingId(null);
    }
  };

  const toggleCommentExpand = (id: number) => {
    setExpandedCommentId((prev) => (prev === id ? null : id));
  };

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

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className={c.tableWrap}>
      <TableSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dataType={'PotentialSponsorDto'}
      />
      <div className={c.filters}>
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
            const isEditing = editingId === sponsor.id;
            const isExpanded = expandedCommentId === sponsor.id;
            const currentValues = formState[sponsor.id] || sponsor;

            return (
              <tr
                key={sponsor.id}
                className={index % 2 === 0 ? c.altRow : undefined}>
                <td>
                  <select
                    className={`${c.tierSelect} ${getTierClass(currentValues.tier as Tier)}`}
                    value={currentValues.tier || ''}
                    onChange={(e) =>
                      handleInputChange(sponsor.id, 'tier', e.target.value)
                    }>
                    {Object.values(Tier).map((tier) => (
                      <option
                        key={tier}
                        value={tier}
                        className={c[`tier${tier}`]}>
                        {TierLabels[tier as Tier]}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type='text'
                      value={currentValues.company || ''}
                      onChange={(e) =>
                        handleInputChange(sponsor.id, 'company', e.target.value)
                      }
                    />
                  ) : (
                    sponsor.company
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type='email'
                      value={currentValues.email || ''}
                      onChange={(e) =>
                        handleInputChange(sponsor.id, 'email', e.target.value)
                      }
                    />
                  ) : (
                    sponsor.email
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type='text'
                      value={currentValues.representative || ''}
                      onChange={(e) =>
                        handleInputChange(
                          sponsor.id,
                          'representative',
                          e.target.value,
                        )
                      }
                    />
                  ) : (
                    sponsor.representative
                  )}
                </td>

                <td className={c.commentCell}>
                  {isEditing ? (
                    <textarea
                      value={currentValues.comment || ''}
                      onChange={(e) =>
                        handleInputChange(sponsor.id, 'comment', e.target.value)
                      }
                      className={c.textArea}
                      rows={2}
                    />
                  ) : sponsor.comment ? (
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
                    className={`${c.statusSelect} ${getStatusClass(currentValues.status as SponsorStatus)}`}
                    value={currentValues.status || ''}
                    onChange={(e) =>
                      handleInputChange(sponsor.id, 'status', e.target.value)
                    }>
                    {Object.values(SponsorStatus).map((status) => (
                      <option
                        key={status}
                        value={status}
                        className={c[`status${status}`]}>
                        {StatusLabels[status as SponsorStatus]}
                      </option>
                    ))}
                  </select>
                </td>

                <td className={c.actionsCell}>
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(sponsor.id)}
                        style={{ marginRight: '2px' }}>
                        Save
                      </button>
                      <button
                        type='button'
                        className={c.cancelButton}
                        onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(sponsor)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
