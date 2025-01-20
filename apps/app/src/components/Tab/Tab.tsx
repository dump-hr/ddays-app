import clsx from 'clsx';
import c from './Tab.module.scss';

export type TabProps = {
  id: string | number;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const Tab: React.FC<TabProps> = ({
  id,
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      id={id as string}
      className={clsx({ [c.tab]: true, [c.isActive]: isActive })}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Tab;
