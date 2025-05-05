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
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location, navigate] = useLocation();
  const { user, logout } = useAccount();

  return (
    <div className={c.layout}>
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
