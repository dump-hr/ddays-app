import { useLocation } from 'react-router-dom';
import {
  navigationItems,
  type NavigationItemData,
} from '../router/navigationItemsData';

export const useNavigationItems = () => {
  const location = useLocation();

  const findPath = (
    items: NavigationItemData[],
    target: string,
  ): NavigationItemData[] | null => {
    for (const item of items) {
      if (item.route === target) {
        return [item];
      }
      if (item.subItems) {
        const path = findPath(item.subItems, target);
        if (path) {
          return [item, ...path];
        }
      }
    }
    return null;
  };

  const currentItem =
    findPath(navigationItems, location.pathname)?.slice(-1)[0] || null;
  const breadcrumbItems = findPath(navigationItems, location.pathname) || [];

  return { currentItem, breadcrumbItems };
};
