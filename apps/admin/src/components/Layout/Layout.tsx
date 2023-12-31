import useLocation from 'wouter/use-location';

import { useAccount } from '../../hooks/useUser';
import Button from '../Button';
import c from './Layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/guest',
    text: 'Guest',
  },
  {
    href: '/events',
    text: 'Events',
  },
  {
    href: '/achievements',
    text: 'Achievements',
  },
  {
    href: '/notifications',
    text: 'Notifications',
  },
  {
    href: '/faqs',
    text: 'FAQ',
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
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

export default Layout;
