type AvatarIconProps = {
  width?: number;
  height?: number;
};

const AvatarIcon: React.FC<AvatarIconProps> = ({ width = 64, height = 64 }) => {
  return (
    <svg width={width} height={height}>
      <use href="/avatars.svg#oneEyedDevil" />
    </svg>
  );
};

export default AvatarIcon;
