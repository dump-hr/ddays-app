import styles from './HeaderCard.module.scss';

interface HeaderCardProps {
  img: string;
  text: string;
  imgWidth: number;
  imgHeight: number;
  width?: number | null;
  height?: number | null;
}
export const HeaderCard = ({
  img,
  text,
  imgWidth,
  imgHeight,
  width = null,
  height = null,
}: HeaderCardProps) => {
  return (
    <div
      className={styles.headerCard}
      style={{
        ...(width ? { width: `${width}px` } : {}),
        ...(height ? { height: `${height}px` } : {}),
      }}>
      <img src={img} alt={text} width={imgWidth} height={imgHeight} />
      <p>{text}</p>
    </div>
  );
};
