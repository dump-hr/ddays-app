import DaysSticker from '../../assets/images/days-sticker.png';
import Digitalac from '../../assets/images/digitalac.png';
import Dizajner from '../../assets/images/dizajner.png';
import Marketingas from '../../assets/images/marketingas.png';
import Poduzetnik from '../../assets/images/poduzetnik.png';
import Programer from '../../assets/images/programer.png';
import c from './ScrollingTitle.module.scss';

const Content = () => {
  return (
    <div className={c.content}>
      <div className={c.people}>
        <img src={Digitalac} alt='' />
        <img src={Marketingas} alt='' />
        <img src={Programer} alt='' />
        <img src={Dizajner} alt='' />
        <img src={Poduzetnik} alt='' />
      </div>
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
