import clsx from 'clsx';
import React from 'react';
import useLocation from 'wouter/use-location';

import AppSvg from '../../assets/app.svg';
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
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};
