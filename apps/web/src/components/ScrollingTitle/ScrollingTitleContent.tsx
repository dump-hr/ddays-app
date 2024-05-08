import DaysSticker from '../../assets/images/days-sticker.webp';
import Digitalac from '../../assets/images/digitalac.webp';
import Dizajner from '../../assets/images/dizajner.webp';
import Marketingas from '../../assets/images/marketingas.webp';
import Poduzetnik from '../../assets/images/poduzetnik.webp';
import Programer from '../../assets/images/programer.webp';
import c from './ScrollingTitle.module.scss';

const Content = () => {
  return (
    <div className={c.content}>
      <div className={c.people}>
        <img className={c.person} src={Digitalac} alt='' />
        <img className={c.person} src={Marketingas} alt='' />
        <img className={c.person} src={Programer} alt='' />
        <img className={c.person} src={Dizajner} alt='' />
        <img className={c.person} src={Poduzetnik} alt='' />
      </div>

      <div className={c.stickerTitle}>
        <h1 className={c.title}>Digitalaca</h1>
        <img className={c.sticker} src={DaysSticker} alt='' />
        <h1 className={c.title}>Marketingaša</h1>
        <img className={c.sticker} src={DaysSticker} alt='' />
        <h1 className={c.title}>Programera</h1>
        <img className={c.sticker} src={DaysSticker} alt='' />
        <h1 className={c.title}>Dizajnera</h1>
        <img className={c.sticker} src={DaysSticker} alt='' />
        <h1 className={c.title}>Poduzetnika</h1>
        <img className={c.sticker} src={DaysSticker} alt='' />
      </div>
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
