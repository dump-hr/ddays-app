import { Outlet } from 'react-router-dom';
import c from './Layout.module.scss';
import ProfilePicturePlaceholder from '/src/assets/images/profile-picture-placeholder.jpg';
import LogoutIcon from '@/assets/icons/logout.svg';

export const Layout = () => {
  return (
    <div className={c.layout}>
      <div className={c.sidebar}>
        <div className={c.profileInfoWrapper}>
          <div className={c.profileInfo}>
            <img src={ProfilePicturePlaceholder} alt='' />
            <div className={c.profileDetails}>
              <div className={c.roleAndName}>
                <div className={c.role}>S</div>
                <p className={c.name}>Lovre Tomić</p>
              </div>
              <p className={c.email}>lovre.tomic@dump.hr</p>
            </div>
          </div>
          <img src={LogoutIcon} className={c.logoutButton} />
        </div>
      </div>
      <main className={c.main}>
        <header className={c.header}></header>
        <Outlet />
      </main>
    </div>
  );
};
