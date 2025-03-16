import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import c from './InterestsPage.module.scss';
import TempAvatar from '../../assets/images/temp-avatar.png';
import { InterestProgressBar } from '../../components/InterestProgressBar';
import Button from '../../components/Button';
import Pencil from '@/assets/icons/pencil-icon.svg';

export const InterestsPage = () => {
  return (
    <>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Interesi</span> <br />
            Marija Gudelj
          </p>

          <AvatarPointsCircle points={900} avatar={TempAvatar} />
        </div>

        <div className={c.statsWrapper}>
          <InterestProgressBar label='Programiranje' percentage={50} />
          <InterestProgressBar label='Marketing' percentage={72} />
          <InterestProgressBar label='Product' percentage={22} />
          <InterestProgressBar label='Product' percentage={22} />
        </div>
      </header>
      {/* 
      <Button variant='beige' icon={Pencil}>
        Uredi svoje interese
      </Button> */}
    </>
  );
};
