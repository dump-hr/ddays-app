import styles from './HeaderCard.module.scss';
import sprite from './../../../assets/sprite.svg';

interface HeaderCardProps {
  icon: string;
  text: string;
  width: number;
  height: number;
}
export const HeaderCard = ({ icon, text, width, height }: HeaderCardProps) => {
  return (
    <div className={styles.headerCard}>
      <svg height={height} width={width}>
        <use href={`${sprite}#${icon}`} />
      </svg>

      <p>{text}</p>
    </div>
  );
};
