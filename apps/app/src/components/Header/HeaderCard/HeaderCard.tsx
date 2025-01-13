import styles from './HeaderCard.module.scss';

interface HeaderCardProps {
  img: string;
  text: string;
  width: number;
  height: number;
}
export const HeaderCard = ({ img, text, width, height }: HeaderCardProps) => {
  return (
    <div className={styles.headerCard}>
      <img src={img} alt={text} width={width} height={height} />
      <p>{text}</p>
    </div>
  );
};
