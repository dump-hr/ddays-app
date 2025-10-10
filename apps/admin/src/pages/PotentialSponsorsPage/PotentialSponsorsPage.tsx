import { useState, useMemo } from 'react';
import { usePotentialSponsorGetAll } from '../../api/potential-sponsor/usePotentialSponsorGetAll';
import { PotentialSponsorsTable } from '../../components/PotentialSponsorsTable';
import { PotentialSponsorForm } from '../../forms/PotentialSponsorForm';
import { TableSearch } from '../../components/TableDashboard/TableSearch';
import { PotentialSponsorsFilters } from '../../components/PotentialSponsorsTable/PotentialSponsorFilters/PotentialSponsorFilters';
import { SponsorStatus, Tier } from '@ddays-app/types';
import { usePotentialSponsorUpdate } from '../../api/potential-sponsor/usePotentialSponsorUpdate';

import c from './PotentialSponsorsPage.module.scss';

export const PotentialSponsorsPage = () => {
  const { data: potentialSponsors, refetch } = usePotentialSponsorGetAll();
  const updateSponsor = usePotentialSponsorUpdate();

  const [searchTerm, setSearchTerm] = useState('');
  const [representativeFilter, setRepresentativeFilter] = useState('');
  const [tierFilter, setTierFilter] = useState<Tier | ''>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const filteredSponsors = useMemo(() => {
    if (!potentialSponsors) return [];
    return potentialSponsors.filter((s) => {
      const matchesCompany = s.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRep =
        representativeFilter === '' ||
        s.representative.toLowerCase() === representativeFilter.toLowerCase();
      const matchesTier = tierFilter === '' || s.tier === tierFilter;
      return matchesCompany && matchesRep && matchesTier;
    });
  }, [potentialSponsors, searchTerm, representativeFilter, tierFilter]);

  const uniqueRepresentatives = potentialSponsors
    ? Array.from(new Set(potentialSponsors.map((s) => s.representative))).sort()
    : [];

  const handleAssignRepresentative = (
    start: number,
    end: number,
    representative: string,
  ) => {
    const filtered = filteredSponsors.slice(start - 1, end);
    filtered.forEach((sponsor) => {
      updateSponsor.mutate({
        id: sponsor.id,
        company: sponsor.company,
        email: sponsor.email || '',
        comment: sponsor.comment || '',
        tier: sponsor.tier as Tier,
        status: sponsor.status as SponsorStatus,
        representative,
      });
    });
  };

  const handleOpenForm = (id?: number) => {
    setEditId(id ?? null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    refetch();
  };

  return (
    <div>
      {!potentialSponsors ? (
        <div>Loading...</div>
      ) : (
        <>
          <TableSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            dataType={'PotentialSponsorDto'}
          />

          <PotentialSponsorsFilters
            onAdd={() => {
              handleOpenForm();
            }}
            tierFilter={tierFilter}
            onTierChange={setTierFilter}
            representativeFilter={representativeFilter}
            onRepresentativeChange={setRepresentativeFilter}
            uniqueRepresentatives={uniqueRepresentatives}
            onAssignRepresentative={handleAssignRepresentative}
          />

          {filteredSponsors.length > 0 ? (
            <PotentialSponsorsTable
              sponsors={filteredSponsors}
              onEdit={handleOpenForm}
            />
          ) : (
            <p>No potential sponsors found.</p>
          )}

          {isFormOpen && (
            <div className={c.modalBackdrop} onClick={handleCloseForm}>
              <div
                className={c.modalContent}
                onClick={(e) => e.stopPropagation()}>
                <PotentialSponsorForm
                  onSuccess={handleFormSuccess}
                  id={editId ?? undefined}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
