import DaysSticker from '../../assets/images/days-sticker.png';
import People from '../../assets/images/people.png';
import c from './ScrollingTitle.module.scss';

const Content = () => {
  return (
    <div className={c.content}>
      <img className={c.people} src={People} alt='' />
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
