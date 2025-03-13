import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import c from './ProfileAchievementsPage.module.scss';
import TempAvatar from '../../assets/images/temp-avatar.png';
import ProfileStat from '../../components/ProfileStat';
import ArrowLeft from '../../assets/icons/arrow-left.svg';

export const ProfileAchievementsPage = () => {
  return (
    <>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Profil</span> <br />
            Marija Gudelj
          </p>

          <AvatarPointsCircle points={900} avatar={TempAvatar} />
        </div>

        <div className={c.stats}>
          <ProfileStat label='Bodovi' value='145' />
          <ProfileStat label='Postignuća' value='3/25' />
        </div>
      </header>
      <main className={c.main}>
        <header className={c.mainHeader}>
          <img src={ArrowLeft} alt='' className={c.arrowLeft} />
          <h3 className={c.title}>Postignuća</h3>
        </header>
      </main>
    </>
  );
};
