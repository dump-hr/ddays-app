import c from './StatCard.module.scss';

type StatCardProps = {
  image: string;
  number: string | number;
  text: string;
};

export const StatCard = ({ image, number, text }: StatCardProps) => {
  return (
    <div className={c.statCard}>
      <div className={c.imageWrapper}>
        <img src={image} alt='' className={c.bgImage} />
        <div className={c.overlay} />
      </div>
      <div className={c.content}>
        <span className={c.number}>{number}</span>
        <div className={c.labelWrapper}>
          <span className={c.label}>{text}</span>
        </div>
      </div>
    </div>
  );
};
