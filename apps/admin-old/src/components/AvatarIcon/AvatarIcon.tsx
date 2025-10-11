import avatarsSvgSprite from '@/assets/icons/avatars.svg';

type AvatarIconProps = {
  width?: number;
  height?: number;
  avatarId: string;
};

export const AvatarIcon: React.FC<AvatarIconProps> = ({
  width = 64,
  height = 64,
  avatarId,
}) => {
  return (
    <svg width={width} height={height}>
      <use href={`${avatarsSvgSprite}#${avatarId}`} />
    </svg>
  );
};
