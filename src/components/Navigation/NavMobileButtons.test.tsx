import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';
import { useMenusStore } from '../../stores/menus.ts';

import { NavMobileButtons } from './NavMobileButtons.tsx';

describe('NavMobileButtons', async () => {
  test('should render without error', () => {
    const view = render(<NavMobileButtons />);
    expect(screen.getByTestId('mobile-buttons-container')).toBeInTheDocument();
    view.unmount();
  });
  test('opens mobile menu when menu button is clicked', async (done) => {
    const view = render(<NavMobileButtons />);
    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);
    const store = useMenusStore.getState();
    expect(store.value.attrMobile).toBeTruthy();
    setTimeout(function () {
      done.expect(store.value.navClasses?.['mobile-side-in']).toBeTruthy();
    }, 450);
    view.unmount();
  });

  test('closes mobile menu when window is clicked', (done) => {
    const view = render(<NavMobileButtons />);
    const menuButton = screen.getByTestId('menu-button');
    fireEvent.click(menuButton);

    const store = useMenusStore.getState();

    setTimeout(function () {
      done.expect(store.value.navClasses?.['mobile-side-in']).toBeTruthy();
      fireEvent.click(window);
      done.expect(store.value.navClasses?.['mobile-side-in']).toBeFalsy();
    }, 450);

    view.unmount();
  });
});
