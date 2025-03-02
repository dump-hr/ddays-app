import { PropsWithChildren } from 'react';
import styles from './HeaderCard.module.scss';

interface HeaderCardProps {
  img: string;
  text: string;
  imgWidth: number;
  imgHeight: number;
  onClick?: () => void;
  width?: number | null;
  height?: number | null;
}
export const HeaderCard = ({
  img,
  text,
  imgWidth,
  imgHeight,
  onClick = () => {},
  width = null,
  height = null,
  children,
}: PropsWithChildren<HeaderCardProps>) => {
  return (
    <div
      className={styles.headerCard}
      onClick={onClick}
      style={{
        ...(width ? { width: `${width}px` } : {}),
        ...(height ? { height: `${height}px` } : {}),
      }}>
      <div className={styles.headerCardInner}>
        <img src={img} alt={text} width={imgWidth} height={imgHeight} />
        <p>{text}</p>
        {children}
      </div>
    </div>
  );
};
