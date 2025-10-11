import type { FC } from 'react';
import c from './TableSearch.module.scss';
import { useNavigationItems } from '../../../hooks/useNavigationItems';
import SearchIcon from '@/assets/icons/search.svg?react';

type TableSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dataType?: string;
};

export const TableSearch: FC<TableSearchProps> = ({
  searchTerm,
  onSearchChange,
  dataType,
}) => {
  const { currentItem } = useNavigationItems();

  return (
    <div className={c.searchContainer}>
      {currentItem && (
        <div className={c.searchLabelWrapper}>
          {currentItem.icon && <currentItem.icon className={c.searchIcon} />}
          <span className={c.searchLabel}>{currentItem.label}</span>
          <span className={c.dataTypeLabel}>{dataType}</span>
        </div>
      )}
      <div className={c.searchInputWithIcon}>
        <SearchIcon className={c.searchInputIcon} />
        <input
          type='text'
          placeholder='Pretraži...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={c.searchInput}
        />
      </div>
    </div>
  );
};
