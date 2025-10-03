import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import c from './Layout.module.scss';
import ProfilePicturePlaceholder from '/src/assets/images/profile-picture-placeholder.jpg';
import LogoutIcon from '@/assets/icons/logout.svg';
import { navigationItems } from '../navigationItemsData';
import NavigationItem from '../../components/NavigationItem';
import { useNavigationItems } from '../../hooks/useNavigationItems';
import ChevronRightIcon from '@/assets/icons/chevron_right.svg?react';
import { useAccount } from '../../hooks/useAccount';
import MenuIcon from '@/assets/icons/menu.svg?react';
import CloseIcon from '@/assets/icons/close-arrow-left.svg?react';

export const Layout = () => {
  const location = useLocation();
  const { user, logout } = useAccount();
  const { breadcrumbItems } = useNavigationItems();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({});

  const isSelected = (route: string) =>
    location.pathname === route || location.pathname === route + '/';

  const toggleParent = (route: string) => {
    setOpenParents((prev) => ({
      ...prev,
      [route]: !prev[route],
    }));
  };

  return (
    <div className={c.layout}>
      <div className={`${c.sidebar} ${isSidebarOpen ? c.open : ''}`}>
        <div className={c.profileInfoWrapper}>
          <div className={c.profileInfo}>
            <button
              className={c.sidebarCloseButton}
              onClick={() => setSidebarOpen(false)}>
              <CloseIcon />
            </button>
            <img src={ProfilePicturePlaceholder} alt='Profile' />
            <div className={c.profileDetails}>
              <div className={c.roleAndName}>
                <div className={c.role}>S</div>
                <p className={c.name}>{user.name}</p>
              </div>
              <p className={c.email}>{user.email}</p>
            </div>
          </div>
          <img
            src={LogoutIcon}
            className={c.logoutButton}
            alt='Logout'
            onClick={() => logout()}
          />
        </div>

        <nav className={c.navigation}>
          {navigationItems.map((item) => {
            const parentOpen = openParents[item.route] || false;
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <React.Fragment key={item.route}>
                <NavigationItem
                  navigationItem={item}
                  isSelected={isSelected(item.route)}
                  isOpen={parentOpen}
                  onToggle={() => toggleParent(item.route)}
                />
                {hasSubItems && parentOpen && (
                  <div className={c.subMenu}>
                    {item.subItems?.map((subItem) => (
                      <NavigationItem
                        key={subItem.route}
                        navigationItem={subItem}
                        isSelected={isSelected(subItem.route)}
                      />
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      <main className={c.main}>
        <header className={c.header}>
          <button
            className={c.hamburgerButton}
            onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <div className={c.breadcrumbs}>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.route}>
                <div className={c.breadcrumbItem}>
                  {item.icon && <item.icon className={c.breadcrumbIcon} />}
                  <span>{item.label}</span>
                </div>
                {index < breadcrumbItems.length - 1 && (
                  <ChevronRightIcon className={c.breadcrumbSeparator} />
                )}
              </React.Fragment>
            ))}
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
