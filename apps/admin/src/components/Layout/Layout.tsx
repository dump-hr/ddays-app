import { useEffect, useState } from 'react';
import useLocation from 'wouter/use-location';

import { Path } from '../../constants/paths';
import { useAccount } from '../../hooks/useAccount';
import { Button } from '../Button';
import c from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: Path.Home, text: 'Home' },
  { href: Path.Company, text: 'Company' },
  { href: Path.Interest, text: 'Interest' },
  { href: Path.Event, text: 'Event' },
  { href: Path.Speaker, text: 'Speaker' },
  { href: Path.Booth, text: 'Booth' },
  { href: Path.Reward, text: 'Reward' },
  { href: Path.Achievement, text: 'Achievement' },
  { href: Path.Code, text: 'Code' },
  { href: Path.Accreditation, text: 'Accreditation' },
  { href: Path.AccreditationScan, text: 'Accreditation Scan' },
  { href: Path.TransactionScan, text: 'Transaction Scan' },
  { href: Path.Shopping, text: 'Shopping' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location, navigate] = useLocation();
  const { user, logout } = useAccount();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when navigation occurs
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className={c.layout}>
      {/* Hamburger button for mobile */}
      <div className={c.hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span className={sidebarOpen ? c.active : ''}></span>
        <span className={sidebarOpen ? c.active : ''}></span>
        <span className={sidebarOpen ? c.active : ''}></span>
      </div>

      {/* Mobile sidebar */}
      <div className={`${c.sidebar} ${sidebarOpen ? c.open : ''}`}>
        <div className={c.mobilePages}>
          <h3>Navigation</h3>
          {navLinks.map(({ href, text }) => (
            <Button
              key={href}
              variant={location === href ? 'primary' : 'secondary'}
              onClick={() => {
                navigate(href);
                setSidebarOpen(false);
              }}
              className={c.mobileNavButton}>
              {text}
            </Button>
          ))}
        </div>

        <div className={c.mobileAccount}>
          <div className={c.user}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <Button onClick={() => logout()} variant='secondary'>
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay for when sidebar is open */}
      {sidebarOpen && (
        <div className={c.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Desktop navigation */}
      <nav className={c.nav}>
        <div className={c.pages}>
          {navLinks.map(({ href, text }) => (
            <Button
              key={href}
              variant={location === href ? 'primary' : 'secondary'}
              onClick={() => navigate(href)}>
              {text}
            </Button>
          ))}
        </div>

        <div className={c.account}>
          <div className={c.user}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          <Button onClick={() => logout()} variant='secondary'>
            Logout
          </Button>
        </div>
      </nav>

      {children}
    </div>
  );
};
