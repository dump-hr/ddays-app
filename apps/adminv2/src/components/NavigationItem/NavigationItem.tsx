import type { NavigationItemData } from '../../router/navigationItemsData';
import ModelIcon from '@/assets/icons/model.svg';

import c from './NavigationItem.module.scss';
import { useNavigate } from 'react-router-dom';

type NavigationItemProps = {
  navigationItem: NavigationItemData;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ navigationItem }) => {
  const { label, icon, route } = navigationItem;
  const navigate = useNavigate();

  return (
    <button className={c.navigationItem} onClick={() => navigate(route)}>
      <img src={icon || ModelIcon} alt='' className={c.icon} />
      {label}
    </button>
  );
};

export default NavigationItem;
