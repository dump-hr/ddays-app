import clsx from 'clsx';
import React from 'react';
import useLocation from 'wouter/use-location';

import { logout } from '../../api/auth/logout';
import AppSvg from '../../assets/images/app.svg';
import logoutImage from '../../assets/images/logout.svg';
import { pages } from '../../constants/pages';
import c from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location, navigate] = useLocation();
  const isCurrentPage = (path: string) => location === path;

  return (
    <>
      <nav className={c.navWrapper}>
        <div className={c.nav}>
          <img src={AppSvg} alt='App logo' className={c.navLogo} />
          <div className={c.navItemsWrapper}>
            {pages.map(({ path, name, icon }) => (
              <div
                className={clsx(c.navItem, {
                  [c.activeItem]: isCurrentPage(path),
                })}
                onClick={() => navigate(path)}
                key={path}>
                <img src={icon} alt={name} />
                <p>{name}</p>
              </div>
            ))}
            <div className={c.navItem} onClick={() => logout()} key={'logout'}>
              <img src={logoutImage} alt={'odjava'} />
              <p>Odjava</p>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};
