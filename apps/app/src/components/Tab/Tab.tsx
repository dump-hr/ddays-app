import clsx from 'clsx';
import c from './Tab.module.scss';

export type TabProps = {
  id: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const Tab: React.FC<TabProps> = ({ id, label, isActive = false, onClick }) => {
  return (
    <button
      id={id}
      className={clsx({ [c.tab]: true, [c.isActive]: isActive })}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Tab;
