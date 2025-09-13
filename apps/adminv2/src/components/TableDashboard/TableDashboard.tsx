import React, { useState, useMemo } from 'react';
import c from './TableDashboard.module.scss';
import { TableSearch } from './TableSearch';
import { TableActions } from './TableActions';
import { Table } from './Table';
import { Direction, DataRow } from '../../types/table';

const mockData: DataRow[] = [
  {
    Id: 1,
    Ime: 'Ivan',
    'Godina rođenja': 2005,
    'Potvrđen?': true,
    'Profilna fotografija': 'link',
    Bodovi: 1750,
    Lozinka: 'hash',
    Kompanija: 'Abysalto',
    Tip: 'LECTURE',
  },
  {
    Id: 2,
    Ime: 'Marko',
    'Godina rođenja': 2005,
    'Potvrđen?': false,
    'Profilna fotografija': 'link',
    Bodovi: 568,
    Lozinka: 'hash',
    Kompanija: 'OTP banka',
    Tip: 'CAMPFIRE_TALK',
  },
  {
    Id: 3,
    Ime: 'Petar',
    'Godina rođenja': 2005,
    'Potvrđen?': true,
    'Profilna fotografija': 'link',
    Bodovi: 1750,
    Lozinka: 'hash',
    Kompanija: 'Ericsson Nikola Tesla',
    Tip: 'OTHER',
  },
];

const getDataType = (value: string | number | boolean | Date) => {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (value instanceof Date) return 'timestamp';
  return 'string';
};

export const TableDashboard: React.FC = () => {
  const columns = Object.keys(mockData[0]);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: Direction;
  }>({
    key: '',
    direction: 'asc',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleCheckAll = () => {
    if (selected.length === mockData.length) {
      setSelected([]);
    } else {
      setSelected(mockData.map((r) => r.Id));
    }
  };

  const handleSort = () => {
    const key = sortConfig.key || columns[0];
    const direction: Direction =
      sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return mockData.filter((row) =>
      String(row.Ime).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      }
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        return sortConfig.direction === 'asc'
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }
      return sortConfig.direction === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [sortConfig, filteredData]);

  return (
    <div className={c.tableContainer}>
      <TableSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <TableActions
        selectedCount={selected.length}
        totalCount={mockData.length}
        onSort={handleSort}
      />

      <Table
        columns={columns}
        data={sortedData}
        selected={selected}
        onCheckAll={handleCheckAll}
        onCheckboxChange={handleCheckboxChange}
        getDataType={getDataType}
      />
    </div>
  );
};
