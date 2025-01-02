import c from './ToggleButton.module.scss';
import clsx from 'clsx';

type ToggleButtonProps = {
  toggled: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ToggleButton: React.FC<ToggleButtonProps> = ({
  toggled,
  ...handlers
}) => {
  return (
    <button
      className={clsx(c.toggleButton, {
        [c.toggled]: toggled,
      })}
      {...handlers}>
      <div
        className={clsx(c.circle, {
          [c.toggledCircle]: toggled,
        })}></div>
    </button>
  );
};

export default ToggleButton;
