import type { NavigationItemData } from '../../router/navigationItemsData';
import ModelIcon from '@/assets/icons/model.svg?react';
import ExpandDownIcon from '@/assets/icons/expand-down.svg?react';

import c from './NavigationItem.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type NavigationItemProps = {
  navigationItem: NavigationItemData;
  isSelected: boolean;
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  navigationItem,
  isSelected,
}) => {
  const { label, route, subItems } = navigationItem;
  const navigate = useNavigate();

  const hasSubItems = subItems && subItems.length > 0;

  return (
    <button
      className={clsx(c.navigationItem, {
        [c.selected]: isSelected,
        [c.fullWidth]: hasSubItems,
      })}
      onClick={() => navigate(route)}>
      <ModelIcon className={c.icon} />
      {label}
      {hasSubItems && <ExpandDownIcon className={c.expandIcon} />}
    </button>
  );
};

export default NavigationItem;
