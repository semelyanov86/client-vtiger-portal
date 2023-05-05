import { MenuItem } from '../components/Navigation/main-menu/MainMenuItems.tsx';

import { MenuRoutesInterface } from './menuRoutes.ts';

export const convertToMenuItems = (data: MenuRoutesInterface | MenuItem[]): MenuItem[] => {
  let items = [];
  if (Array.isArray(data)) {
    items = data;
  } else {
    items = [...data.sidebarItems, ...data.mainMenuItems];
  }

  const itemMapper = (item: MenuItem) => {
    const tempItem = { ...item };

    if (tempItem.subs && item.subs) {
      tempItem.subs = item.subs
        .map((sub) => {
          const controlledSub = { ...sub, path: tempItem.path + sub.path };
          if (tempItem.mega || tempItem.megaParent) controlledSub.megaParent = true;
          return itemMapper(controlledSub);
        })
        .filter((x) => Object.keys(x).length > 0) as MenuItem[];

      if (tempItem.subs.length === 0) delete tempItem.subs;
    }
    if (tempItem.label) return clearMenuItem(tempItem);
    return {} as MenuItem;
  };
  return items.map(itemMapper).filter((x) => Object.keys(x).length > 0);
};

const clearMenuItem = (menuItem: MenuItem): MenuItem => {
  const item: Partial<MenuItem> = {};

  if (menuItem.path) item.path = menuItem.path;
  if (menuItem.label) item.label = menuItem.label;
  if (menuItem.icon) item.icon = menuItem.icon;
  if (menuItem.isExternal) item.isExternal = menuItem.isExternal;
  if (menuItem.subs) item.subs = menuItem.subs;
  if (menuItem.mega) item.mega = menuItem.mega;
  if (menuItem.megaParent) item.megaParent = menuItem.megaParent;

  return item as MenuItem;
};

export const getMenuItems = (data: MenuRoutesInterface | MenuItem[]) => convertToMenuItems(data);
