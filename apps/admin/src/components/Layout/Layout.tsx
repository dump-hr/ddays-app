import useLocation from 'wouter/use-location';

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
    href: '/interests',
    text: 'Interests',
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location, navigate] = useLocation();

  return (
    <div className={c.layout}>
      <nav className={c.nav}>
        {navLinks.map(({ href, text }) => (
          <Button
            key={href}
            variant={location === href ? 'primary' : 'secondary'}
            onClick={() => navigate(href)}>
            {text}
          </Button>
        ))}
      </nav>
      {children}
    </div>
  );
};

export default Layout;
