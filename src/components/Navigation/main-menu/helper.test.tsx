import { expect, test, describe } from 'vitest';

import '@testing-library/jest-dom';

import { DIMENSION, MENU_BEHAVIOUR, MENU_PLACEMENT } from '../../../config/constants.ts';
import { Menus } from '../../../stores/menus.ts';

import {
  checkBehaviour,
  checkPlacement,
  isDeeplyDiffBehaviourStatus,
  isDeeplyDiffPlacementStatus,
} from './helper.ts';

describe('MainMenuHelper', () => {
  describe('checkPlacement', () => {
    test('should return the correct placement for horizontal menu on mobile', () => {
      const placement = MENU_PLACEMENT.Horizontal;
      const breakpoints = { horizontalMobile: 480 };
      const originalWindowInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { value: 400 });

      const result = checkPlacement({ placement, breakpoints } as Menus);

      expect(result).toEqual({
        status: 1,
        placementHtmlData: MENU_PLACEMENT.Horizontal,
        dimensionHtmlData: DIMENSION.Mobile,
        view: MENU_PLACEMENT.Vertical,
      });
      Object.defineProperty(window, 'innerWidth', { value: originalWindowInnerWidth });
    });

    test('should return the correct placement for horizontal menu on desktop', () => {
      const placement = MENU_PLACEMENT.Horizontal;
      const breakpoints = { horizontalMobile: 480 };
      const originalWindowInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { value: 1024 });

      const result = checkPlacement({ placement, breakpoints } as Menus);

      expect(result).toEqual({
        status: 2,
        placementHtmlData: MENU_PLACEMENT.Horizontal,
        dimensionHtmlData: DIMENSION.Desktop,
        view: MENU_PLACEMENT.Horizontal,
      });
      Object.defineProperty(window, 'innerWidth', { value: originalWindowInnerWidth });
    });

    test('should return the correct placement for vertical menu on mobile', () => {
      const placement = MENU_PLACEMENT.Vertical;
      const breakpoints = { verticalMobile: 320 };
      const originalWindowInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { value: 280 });

      const result = checkPlacement({ placement, breakpoints } as Menus);

      expect(result).toEqual({
        status: 3,
        placementHtmlData: MENU_PLACEMENT.Horizontal,
        dimensionHtmlData: DIMENSION.Mobile,
        view: MENU_PLACEMENT.Vertical,
      });
      Object.defineProperty(window, 'innerWidth', { value: originalWindowInnerWidth });
    });

    test('should return the correct placement for vertical menu on desktop', () => {
      const placement = MENU_PLACEMENT.Vertical;
      const breakpoints = { verticalMobile: 320 };
      const originalWindowInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { value: 1440 });

      const result = checkPlacement({ placement, breakpoints } as Menus);

      expect(result).toEqual({
        status: 4,
        placementHtmlData: MENU_PLACEMENT.Vertical,
        dimensionHtmlData: DIMENSION.Desktop,
        view: MENU_PLACEMENT.Vertical,
      });
      Object.defineProperty(window, 'innerWidth', { value: originalWindowInnerWidth });
    });

    test('should return default values for unknown placement', () => {
      const placement = 'unknown';
      const breakpoints = { horizontalMobile: 480, verticalMobile: 320 };
      const originalWindowInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { value: 1024 });

      const result = checkPlacement({ placement, breakpoints } as Menus);

      expect(result).toEqual({ status: 0, placementHtmlData: '', dimensionHtmlData: '', view: '' });
      Object.defineProperty(window, 'innerWidth', { value: originalWindowInnerWidth });
    });
  });
  describe('checkBehavior', () => {
    test('should return the correct behaviour for vertical unpinned menu on mobile', () => {
      const placement = MENU_PLACEMENT.Vertical;
      const behaviour = MENU_BEHAVIOUR.Unpinned;
      const breakpoints = { verticalMobile: 480, verticalUnpinned: 768 };

      const originalWindowInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { value: 400 });

      const result = checkBehaviour({ placement, behaviour, breakpoints } as Menus);

      expect(result).toEqual({
        status: 1,
        behaviourHtmlData: MENU_BEHAVIOUR.Unpinned,
      });

      // Restore the original value of window.innerWidth
      Object.defineProperty(window, 'innerWidth', { value: originalWindowInnerWidth });
    });
    test('should return the correct behaviour for vertical pinned menu on desktop', () => {
      const placement = MENU_PLACEMENT.Vertical;
      const behaviour = MENU_BEHAVIOUR.Pinned;
      const breakpoints = { verticalMobile: 480, verticalUnpinned: 768 };

      const originalWindowInnerWidth = window.innerWidth;
      Object.defineProperty(window, 'innerWidth', { value: 1024 });

      const result = checkBehaviour({ placement, behaviour, breakpoints } as Menus);

      expect(result).toEqual({
        status: 3,
        behaviourHtmlData: MENU_BEHAVIOUR.Pinned,
      });

      // Restore the original value of window.innerWidth
      Object.defineProperty(window, 'innerWidth', { value: originalWindowInnerWidth });
    });

    test('should return the correct behaviour for horizontal unpinned menu', () => {
      const placement = MENU_PLACEMENT.Horizontal;
      const behaviour = MENU_BEHAVIOUR.Unpinned;
      const breakpoints = { verticalMobile: 480, verticalUnpinned: 768 };

      const result = checkBehaviour({ placement, behaviour, breakpoints } as Menus);

      expect(result).toEqual({
        status: 5,
        behaviourHtmlData: MENU_BEHAVIOUR.Unpinned,
      });
    });

    test('should return the correct behaviour for horizontal pinned menu', () => {
      const placement = MENU_PLACEMENT.Horizontal;
      const behaviour = MENU_BEHAVIOUR.Pinned;
      const breakpoints = { verticalMobile: 480, verticalUnpinned: 768 };

      const result = checkBehaviour({ placement, behaviour, breakpoints } as Menus);

      expect(result).toEqual({
        status: 6,
        behaviourHtmlData: MENU_BEHAVIOUR.Pinned,
      });
    });
  });
  describe('isDeeplyDiffPlacementStatus', () => {
    test('should return false if the placement statuses are identical', () => {
      const a = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };
      const b = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };

      const result = isDeeplyDiffPlacementStatus(a, b);

      expect(result).toBe(false);
    });

    test('should return true if the status is different', () => {
      const a = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };
      const b = {
        status: 2,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };

      const result = isDeeplyDiffPlacementStatus(a, b);

      expect(result).toBe(true);
    });

    test('should return true if the placementHtmlData is different', () => {
      const a = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };
      const b = {
        status: 1,
        placementHtmlData: 'vertical',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };

      const result = isDeeplyDiffPlacementStatus(a, b);

      expect(result).toBe(true);
    });

    test('should return true if the dimensionHtmlData is different', () => {
      const a = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };
      const b = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'mobile',
        view: 'horizontal',
      };

      const result = isDeeplyDiffPlacementStatus(a, b);

      expect(result).toBe(true);
    });

    test('should return true if the view is different', () => {
      const a = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'horizontal',
      };
      const b = {
        status: 1,
        placementHtmlData: 'horizontal',
        dimensionHtmlData: 'desktop',
        view: 'vertical',
      };

      const result = isDeeplyDiffPlacementStatus(a, b);

      expect(result).toBe(true);
    });
  });
  describe('isDeeplyDiffBehaviourStatus', () => {
    test('should return false if the behaviour statuses are identical', () => {
      const a = {
        status: 1,
        behaviourHtmlData: 'unpinned',
      };
      const b = {
        status: 1,
        behaviourHtmlData: 'unpinned',
      };

      const result = isDeeplyDiffBehaviourStatus(a, b);

      expect(result).toBe(false);
    });

    test('should return true if the status is different', () => {
      const a = {
        status: 1,
        behaviourHtmlData: 'unpinned',
      };
      const b = {
        status: 2,
        behaviourHtmlData: 'unpinned',
      };

      const result = isDeeplyDiffBehaviourStatus(a, b);

      expect(result).toBe(true);
    });

    test('should return true if the behaviourHtmlData is different', () => {
      const a = {
        status: 1,
        behaviourHtmlData: 'unpinned',
      };
      const b = {
        status: 1,
        behaviourHtmlData: 'pinned',
      };

      const result = isDeeplyDiffBehaviourStatus(a, b);

      expect(result).toBe(true);
    });
  });
});
