import React, { useState, useMemo } from 'react';
import c from './TableDashboard.module.scss';
import { TableSearch } from './TableSearch';
import { TableActions } from './TableActions';
import { Table } from './Table';
import { Direction } from '../../types/table';

type TableDashboardProps = {
  data: any;
};

const getDataType = (value: string | number | boolean | Date) => {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (value instanceof Date) return 'timestamp';
  return 'string';
};

export const TableDashboard: React.FC<TableDashboardProps> = ({ data }) => {
  const columns = Object.keys(data[0]);
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
    if (selected.length === sortedData.length) {
      setSelected([]);
    } else {
      const allIds = sortedData.map((row: any) => row.Id ?? row.id ?? row.ID);
      setSelected(allIds);
    }
  };

  const handleSort = () => {
    const key = sortConfig.key || columns[0];
    const direction: Direction =
      sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowerSearch = searchTerm.toLowerCase();

    return data.filter((row: any) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lowerSearch),
      ),
    );
  }, [searchTerm, data]);

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
        totalCount={data.length}
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
