import clsx from 'clsx';
import Arrow from '../../assets/icons/gray-arrow.svg';
import Duck from '../../assets/images/duck.png';
import c from './RecommendationsButton.module.scss';

type RecommendationsButtonProps = React.HTMLAttributes<HTMLDivElement>;

const RecommendationsButton: React.FC<RecommendationsButtonProps> = ({
  className,
  ...handlers
}) => {
  return (
    <div className={clsx(c.button, className)} {...handlers}>
      <p className={c.text}>
        Preporuke samo za tebe
        <img className={c.arrow} src={Arrow} alt='' />
      </p>
      <img className={c.duck} src={Duck} alt='' />
    </div>
  );
};

export default RecommendationsButton;
