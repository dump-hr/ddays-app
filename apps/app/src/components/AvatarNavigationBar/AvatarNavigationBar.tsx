import { DuckItems } from '@/types/avatar/avatar';
import { Dispatch, FC, SetStateAction } from 'react';
import sprite from '@/assets/sprite.svg';
import c from './AvatarNavigationBar.module.scss';

type AvatarNavigationBarProps = {
  menuOption: DuckItems;
  setMenuOption: Dispatch<SetStateAction<DuckItems>>;
};

export const AvatarNavigationBar: FC<AvatarNavigationBarProps> = ({
  menuOption,
  setMenuOption,
}) => {
  return (
    <div className={c.container}>
      <NavIcon
        iconId='avatar-color-nav-icon'
        width={24}
        height={24}
        selected={menuOption === DuckItems.COLORS}
        optionText='Boja'
        onClick={() => setMenuOption(DuckItems.COLORS)}
      />
      <NavIcon
        iconId='avatar-face-nav-icon'
        width={24}
        height={25}
        selected={menuOption === DuckItems.FACE}
        optionText='Lice'
        onClick={() => setMenuOption(DuckItems.FACE)}
      />
      <NavIcon
        iconId='avatar-accessories-nav-icon'
        width={24}
        height={22}
        selected={menuOption === DuckItems.ACCESSORIES}
        optionText='Dodaci za glavu'
        onClick={() => setMenuOption(DuckItems.ACCESSORIES)}
      />
      <NavIcon
        iconId='avatar-body-nav-icon'
        width={18}
        height={25}
        selected={menuOption === DuckItems.BODY}
        optionText='Dodaci za tijelo'
        onClick={() => setMenuOption(DuckItems.BODY)}
      />
    </div>
  );
};

type NavIconProps = {
  iconId: string;
  selected: boolean;
  optionText: string;
  onClick: () => void;
  width: number;
  height: number;
};

const NavIcon: FC<NavIconProps> = ({
  iconId,
  width,
  height,
  selected,
  optionText,
  onClick,
}) => {
  return (
    <div
      className={`${c.iconContainer} ${
        selected ? c.iconContainerSelected : ''
      }`}>
      <div
        className={`${c.iconWrapper} ${selected ? c.iconWrapperSelected : ''}`}
        onClick={onClick}>
        <svg width={width} height={height} className={c.iconSvg}>
          <use href={`${sprite}#${iconId}${selected ? '-selected' : ''}`} />
        </svg>
      </div>
      <span className={`${c.iconText} ${selected ? c.iconTextSelected : ''}`}>
        {optionText}
      </span>
    </div>
  );
};
