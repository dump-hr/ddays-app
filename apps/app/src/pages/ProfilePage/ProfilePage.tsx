import AvatarPointsCircle from '../../components/AvatarPointsCircle/AvatarPointsCircle';
import c from './ProfilePage.module.scss';
import TempAvatar from '../../assets/images/temp-avatar.png';

export const ProfilePage = () => {
  return (
    <>
      <header className={c.header}>
        <div className={c.basicInfoWrapper}>
          <p className={c.title}>
            <span>Profil</span> <br />
            Marija Gudelj
          </p>
        </div>
        <div className={c.statsWrapper}>
          <AvatarPointsCircle points={900} avatar={TempAvatar} />
        </div>
      </header>
      <main className={c.main}></main>
    </>
  );
};
