import DaysSticker from '../../assets/images/days-sticker.png';
import c from './ScrollingTitle.module.scss';

const Content = () => {
  return (
    <div className={c.content}>
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

const ScrollingTitle = () => {
  return (
    <div className={c.scrollingTitle}>
      <Content />
      <Content />
    </div>
  );
};

export default ScrollingTitle;
