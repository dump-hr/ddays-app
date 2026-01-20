import { SectionBreaker } from 'components/SectionBreaker';

import DaysStickerBig from '../../assets/images/days-sticker-big.webp';
import FullDuckie from '../../assets/images/full-duckie.webp';
import GroupPhoto from '../../assets/images/group-photo.webp';
import c from './TemporaryBanner.module.scss';

const TemporaryBanner = () => {
  return (
    <div className={c.TemporaryBanner}>
      <img src={GroupPhoto} alt='Group Photo' className={c.GroupPhoto} />
      <SectionBreaker fg='dark' className={c.SectionBreaker} />
      <img src={FullDuckie} alt='Full Duckie' className={c.FullDuckie} />
      <p>
        TL;DR <br /> dođi NA DAYSE <br /> I OVE GODINE.
      </p>
      <img
        src={DaysStickerBig}
        alt='DAYS Sticker'
        className={c.DaysStickerBig}
      />
    </div>
  );
};

export default TemporaryBanner;
