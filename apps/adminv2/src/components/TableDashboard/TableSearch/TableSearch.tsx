import React from 'react';
import styles from './TableSearch.module.scss';

type TableSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export const TableSearch: React.FC<TableSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type='text'
        placeholder='Pretraži po imenu...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};
