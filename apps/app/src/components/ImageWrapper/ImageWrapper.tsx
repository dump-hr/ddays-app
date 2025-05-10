import { FC, CSSProperties } from 'react';
import c from './ImageWrapper.module.scss';

interface ImageWrapperProps {
  imageSrc: string;
  altText: string;
  isSelected: boolean;
  onClick: () => void;
  width?: number;
  height?: number;
  showBackground?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  imagePadding?: number;
  alwaysShowBorder?: boolean;
}

export const ImageWrapper: FC<ImageWrapperProps> = ({
  imageSrc,
  altText,
  isSelected,
  onClick,
  width = 194,
  height = 194,
  showBackground = true,
  borderRadius = 30,
  borderWidth = 3,
  imagePadding = 12,
  alwaysShowBorder = false,
}) => {
  const imageWidth = width - imagePadding * 2;
  const imageHeight = height - imagePadding * 2;

  const borderColor = isSelected
    ? '#e0553f'
    : alwaysShowBorder
      ? '#b3b3b2'
      : 'transparent';

  const wrapperStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${borderRadius}px`,
    border: isSelected
      ? `${borderWidth}px solid ${borderColor}`
      : `${borderWidth}px solid ${borderColor}`,
  };

  const imageStyle: CSSProperties = {
    width: `${imageWidth}px`,
    height: `${imageHeight}px`,
    borderRadius: `${borderRadius - imagePadding}px`,
    background: showBackground ? '#f5ede1' : 'transparent',
    padding: showBackground ? `${imagePadding}px` : 0,
    objectFit: showBackground ? 'contain' : ('cover' as 'contain' | 'cover'),
  };

  return (
    <div
      className={`${c.imageWrapper} ${isSelected ? c.selected : ''}`}
      onClick={onClick}
      style={wrapperStyle}>
      <img
        src={imageSrc}
        alt={altText}
        className={c.imageContent}
        style={imageStyle}
      />
    </div>
  );
};
