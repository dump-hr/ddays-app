import type { NavigationItemData } from '../../router/navigationItemsData';
import ModelIcon from '@/assets/icons/model.svg?react';

import c from './NavigationItem.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type NavigationItemProps = {
  navigationItem: NavigationItemData;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ navigationItem }) => {
  const { label, route } = navigationItem;
  const navigate = useNavigate();

  const isSelected =
    window.location.pathname === '/adminv2' + route ||
    window.location.pathname === '/adminv2' + route + '/';

  return (
    <button
      className={clsx(c.navigationItem, {
        [c.selected]: isSelected,
      })}
      onClick={() => navigate(route)}>
      <ModelIcon className={c.icon} />
      {label}
    </button>
  );
};

export default NavigationItem;
