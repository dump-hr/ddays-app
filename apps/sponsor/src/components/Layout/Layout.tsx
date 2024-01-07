import React from 'react';
import useLocation from 'wouter/use-location';

import { pages } from '../../constants/pages';
import c from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location, navigate] = useLocation();

  return (
    <>
      <nav className={c.nav}>
        <img src='/app.svg' alt='App logo' />
        <div className={c.pagesWrapper}>
          {pages.map(({ path, name, icon }) => (
            <div className={c.page} onClick={() => navigate(path)}>
              <img src={icon} alt={name} />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Layout;
