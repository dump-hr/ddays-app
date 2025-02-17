import c from './ProfilePage.module.scss';

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
        <div className={c.statsWrapper}></div>
      </header>
      <main className={c.main}></main>
    </>
  );
};
