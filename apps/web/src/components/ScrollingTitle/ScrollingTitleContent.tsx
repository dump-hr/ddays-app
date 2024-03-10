import DaysSticker from '../../assets/images/days-sticker.png';
import c from './ScrollingTitle.module.scss';

const ScrollingTitle = () => {
  return (
    <div className={c.scrollingTitle}>
      <h1>Digitalaca</h1>
      <img src={DaysSticker} alt='' />
      <h1>Marketingaša</h1>
      <img src={DaysSticker} alt='' />
      <h1>Programera</h1>
      <img src={DaysSticker} alt='' />
      <h1>Dizajnera</h1>
      <img src={DaysSticker} alt='' />
      <h1>Poduzetnika</h1>
      <img src={DaysSticker} alt='' />
    </div>
  );
};

export default ScrollingTitle;
