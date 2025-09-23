import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import c from './Layout.module.scss';
import ProfilePicturePlaceholder from '/src/assets/images/profile-picture-placeholder.jpg';
import LogoutIcon from '@/assets/icons/logout.svg';
import {
  navigationItems,
  type NavigationItemData,
} from '../navigationItemsData';
import NavigationItem from '../../components/NavigationItem';
import { useNavigationItems } from '../../hooks/useNavigationItems';
import ChevronRightIcon from '@/assets/icons/chevron_right.svg?react';
import { useAccount } from '../../hooks/useAccount';

export const Layout = () => {
  const location = useLocation();
  const { user, logout } = useAccount();

  const { breadcrumbItems } = useNavigationItems();

  const isSelected = (route: string) => {
    return location.pathname === route || location.pathname === route + '/';
  };

  const isParentOpen = (item: NavigationItemData) => {
    if (!item.subItems || item.subItems.length === 0) return false;
    return item.subItems.some((sub) => isSelected(sub.route));
  };

  return (
    <div className={c.layout}>
      <div className={c.sidebar}>
        <div className={c.profileInfoWrapper}>
          <div className={c.profileInfo}>
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
            const parentSelected = isSelected(item.route);
            const parentOpen = isParentOpen(item);
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <React.Fragment key={item.route}>
                <NavigationItem
                  navigationItem={item}
                  isSelected={parentSelected}
                  isOpen={parentOpen && hasSubItems}
                />
                {hasSubItems &&
                  (parentSelected || parentOpen) &&
                  item.subItems?.map((subItem) => (
                    <NavigationItem
                      key={subItem.route}
                      navigationItem={subItem}
                      isSelected={isSelected(subItem.route)}
                    />
                  ))}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      <main className={c.main}>
        <header className={c.header}>
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
