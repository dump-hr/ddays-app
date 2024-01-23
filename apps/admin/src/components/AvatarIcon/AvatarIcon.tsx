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
      <use href={`/admin/avatars.svg#${avatarId}`} />
    </svg>
  );
};
