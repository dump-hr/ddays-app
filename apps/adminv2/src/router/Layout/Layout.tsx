import { Outlet, useLocation } from 'react-router-dom';
import c from './Layout.module.scss';
import ProfilePicturePlaceholder from '/src/assets/images/profile-picture-placeholder.jpg';
import LogoutIcon from '@/assets/icons/logout.svg';
import { navigationItems } from '../navigationItemsData';
import NavigationItem from '../../components/NavigationItem';
import React from 'react';

export const Layout = () => {
  const location = useLocation();
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
        <nav className={c.navigation}>
          {navigationItems.map((item) => {
            const isSelected =
              location.pathname === item.route ||
              location.pathname === item.route + '/';

            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <React.Fragment key={item.route}>
                <NavigationItem
                  key={item.route}
                  navigationItem={item}
                  isSelected={isSelected}
                />
                {isSelected &&
                  hasSubItems &&
                  item.subItems?.map((subItem) => {
                    const isSubItemSelected =
                      location.pathname === item.route + subItem.route ||
                      location.pathname === item.route + subItem.route + '/';
                    return (
                      <NavigationItem
                        key={subItem.route}
                        navigationItem={subItem}
                        isSelected={isSubItemSelected}
                      />
                    );
                  })}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
      <main className={c.main}>
        <header className={c.header}></header>
        <Outlet />
      </main>
    </div>
  );
};
