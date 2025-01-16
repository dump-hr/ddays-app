import Arrow from '../../assets/icons/gray-arrow.svg';
import Duck from '../../assets/images/duck.png';
import c from './RecommendationsButton.module.scss';

const RecommendationsButton = () => {
  return (
    <div className={c.button}>
      <p className={c.text}>
        Preporuke samo za tebe
        <img className={c.arrow} src={Arrow} alt='' />
      </p>
      <img className={c.duck} src={Duck} alt='' />
    </div>
  );
};

export default RecommendationsButton;
