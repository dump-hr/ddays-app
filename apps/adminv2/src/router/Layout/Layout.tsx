import { Outlet } from 'react-router-dom';
import c from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <div className={c.sidebar}>
        <div className={c.profileInfoWrapper}>
          <div className={c.profileInfo}>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              alt=''
            />
            <div className={c.profileDetails}>
              <div className={c.roleAndName}>
                <div className={c.role}>S</div>
                <p className={c.name}>Lovre Tomić</p>
              </div>
              <p className={c.email}>lovre.tomic@dump.hr</p>
            </div>
          </div>
          <button className={c.logoutButton}>Odjava</button>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};
