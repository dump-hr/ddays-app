import type { NavigationItemData } from '../../router/navigationItemsData';
import ExpandDownIcon from '@/assets/icons/expand-down.svg?react';
import c from './NavigationItem.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type NavigationItemProps = {
  navigationItem: NavigationItemData;
  isSelected: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  navigationItem,
  isSelected,
  isOpen,
  onToggle,
}) => {
  const { label, route, subItems } = navigationItem;
  const navigate = useNavigate();

  const hasSubItems = subItems && subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems) {
      onToggle?.();
    } else {
      navigate(route);
    }
  };

  return (
    <button
      className={clsx(c.navigationItem, {
        [c.selected]: isSelected,
        [c.open]: isOpen,
        [c.fullWidth]: hasSubItems,
      })}
      onClick={handleClick}>
      {navigationItem.icon && <navigationItem.icon className={c.icon} />}
      {label}
      {hasSubItems && <ExpandDownIcon className={c.expandIcon} />}
    </button>
  );
};

export default NavigationItem;
