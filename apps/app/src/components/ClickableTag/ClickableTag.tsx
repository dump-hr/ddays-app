import clsx from 'clsx';
import c from './ClickableTag.module.scss';

export type ClickableTagProps = {
  id: string | number;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const ClickableTag: React.FC<ClickableTagProps> = ({
  id,
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      id={id as string}
      className={clsx({ [c.clickableTag]: true, [c.isActive]: isActive })}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default ClickableTag;
