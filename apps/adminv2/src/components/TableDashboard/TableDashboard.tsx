import React, { useState, useMemo } from 'react';
import c from './TableDashboard.module.scss';
import { TableSearch } from './TableSearch';
import { TableActions } from './TableActions';
import { Table } from './Table';
import { DataRow, Direction } from '../../types/table';
import toast from 'react-hot-toast';

type TableDashboardProps = {
  data: DataRow[];
  dataType?: string;
  onRefresh?: () => void;
  renderForm?: (onSuccess: () => void, id?: number) => React.ReactNode;
  onEdit?: (ids: number[]) => void;
  onDelete?: (ids: number[]) => void;
  onPrint?: (id: number) => void;
};

export const TableDashboard: React.FC<TableDashboardProps> = ({
  data,
  dataType,
  onRefresh,
  renderForm,
  onEdit,
  onDelete,
  onPrint,
}) => {
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: Direction;
  }>({
    key: '',
    direction: 'asc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleCheckboxChange = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleCheckAll = () => {
    if (selected.length === sortedData.length) {
      setSelected([]);
    } else {
      const allIds = sortedData
        .map((row: DataRow) => row.Id ?? row.id ?? row.ID)
        .filter((id): id is number => typeof id === 'number');
      setSelected(allIds);
    }
  };

  const handlePrint = () => {
    if (!onPrint) return;
    if (selected.length === 0) {
      toast.error('Please select a user to print!');
      return;
    }
    if (selected.length > 1) {
      toast.error('You can print only one user at a time.');
      return;
    }
    onPrint(selected[0]);
  };

  const handleSort = () => {
    const key = sortConfig.key || columns[0];
    const direction: Direction =
      sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleEdit = (ids: number[]) => {
    if (ids.length === 0) {
      toast.error('Molimo odaberite jedan zapis za uređivanje.');
      return;
    }

    if (ids.length > 1) {
      toast.error('Možete uređivati samo jedan zapis istovremeno.');
      return;
    }

    handleOpenForm(ids[0]);
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

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((row: DataRow) =>
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
      <TableSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dataType={dataType}
      />

      <TableActions
        selectedCount={selected.length}
        totalCount={data.length}
        onSort={handleSort}
        onRefresh={onRefresh}
        onCreateNew={() => handleOpenForm()}
        onEdit={
          onEdit ? () => selected.length > 0 && handleEdit(selected) : undefined
        }
        onDelete={
          onDelete ? () => selected.length > 0 && onDelete(selected) : undefined
        }
        onPrint={onPrint ? handlePrint : undefined}
      />

      <Table
        columns={columns}
        data={sortedData}
        selected={selected}
        onCheckAll={handleCheckAll}
        onCheckboxChange={handleCheckboxChange}
        getDataType={(v) => (typeof v === 'boolean' ? 'boolean' : 'string')}
      />

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
