import { create } from 'zustand';

import { DEFAULT_SETTINGS } from '../config';

export const BREAKPOINTS = { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 };

export interface Menus {
  behaviour: string;
  placement: string;
  useSidebar: boolean;
  pinButtonEnable: boolean;
  placementStatus: PlacementStatus;
  behaviourStatus: BehaviourStatus;
  navClasses: navClassesInterface;
  attrMobile: boolean;
  attrMenuAnimate: string;
  collapseAll: boolean;
  breakpoints: BreakpointsInterface;
  menuPadding: number;
}

interface BreakpointsInterface {
  verticalUnpinned: number;
  verticalMobile: number;
  horizontalMobile: number;
}

interface navClassesInterface {
  'mobile-side-in': boolean;
  'mobile-top-out': boolean;
  'mobile-top-in': boolean;
  'mobile-top-ready': boolean;
  'mobile-side-ready': boolean;
}

const initialState = {
  behaviour: DEFAULT_SETTINGS.MENU_BEHAVIOUR,
  placement: DEFAULT_SETTINGS.MENU_PLACEMENT,
  useSidebar: DEFAULT_SETTINGS.USE_SIDEBAR,
  pinButtonEnable: true,
  placementStatus: {} as PlacementStatus,
  behaviourStatus: {} as BehaviourStatus,
  navClasses: {},
  attrMobile: false,
  attrMenuAnimate: '',
  collapseAll: false,
  breakpoints: {
    verticalUnpinned: BREAKPOINTS.xxl,
    verticalMobile: BREAKPOINTS.lg,
    horizontalMobile: BREAKPOINTS.lg,
  },
  menuPadding: 0,
} as Menus;

interface PlacementStatus {
  placementHtmlData: string;
  dimensionHtmlData: string;
  view: string;
}

interface BehaviourStatus {
  behaviourHtmlData: string;
}

interface MenuStore {
  value: Menus;
  menuChangePlacement: (data: string) => void;
  menuChangePlacementStatus: (data: PlacementStatus) => void;
  menuChangeBehaviourStatus: (data: BehaviourStatus) => void;
  menuChangeBehaviour: (data: string) => void;
  menuChangePinButtonEnable: (data: boolean) => void;
  menuChangeAttrMenuAnimate: (data: string) => void;
  menuChangeAttrMobile: (data: boolean) => void;
  menuChangeCollapseAll: (data: boolean) => void;
  menuChangeNavClasses: (data: navClassesInterface) => void;
  menuChangeBreakpoints: (data: BreakpointsInterface) => void;
  menuResetBreakpoints: () => void;
  menuResetUseSidebar: () => void;
  menuChangeUseSidebar: (data: boolean) => void;
  menuChangeMenuPadding: (data: number) => void;
}

export const useMenusStore = create<MenuStore>((set) => ({
  value: initialState,
  menuChangePlacement: (data: string) =>
    set((state) => ({
      value: {
        ...state.value,
        placement: data,
      },
    })),
  menuChangePlacementStatus: (data: PlacementStatus) =>
    set((state) => ({
      value: {
        ...state.value,
        placementStatus: data,
      },
    })),
  menuChangeBehaviour: (data: string) =>
    set((state) => ({
      value: {
        ...state.value,
        behaviour: data,
      },
    })),
  menuChangeBehaviourStatus: (data: BehaviourStatus) =>
    set((state) => ({
      value: {
        ...state.value,
        behaviourStatus: data,
      },
    })),
  menuChangePinButtonEnable: (data: boolean) =>
    set((state) => ({
      value: {
        ...state.value,
        pinButtonEnable: data,
      },
    })),
  menuChangeAttrMenuAnimate: (data: string) =>
    set((state) => ({
      value: {
        ...state.value,
        attrMenuAnimate: data,
      },
    })),
  menuChangeAttrMobile: (data: boolean) =>
    set((state) => ({
      value: {
        ...state.value,
        attrMobile: data,
      },
    })),
  menuChangeCollapseAll: (data: boolean) =>
    set((state) => ({
      value: {
        ...state.value,
        collapseAll: data,
      },
    })),
  menuChangeNavClasses: (data: navClassesInterface) =>
    set((state) => ({
      value: {
        ...state.value,
        navClasses: data,
      },
    })),
  menuChangeBreakpoints: (data: BreakpointsInterface) =>
    set((state) => ({
      value: {
        ...state.value,
        breakpoints: data,
      },
    })),
  menuResetBreakpoints: () =>
    set((state) => ({
      value: {
        ...state.value,
        breakpoints: {
          verticalUnpinned: BREAKPOINTS.xxl,
          verticalMobile: BREAKPOINTS.lg,
          horizontalMobile: BREAKPOINTS.lg,
        } as BreakpointsInterface,
      },
    })),
  menuResetUseSidebar: () =>
    set((state) => ({
      value: {
        ...state.value,
        useSidebar: DEFAULT_SETTINGS.USE_SIDEBAR,
      },
    })),
  menuChangeUseSidebar: (data: boolean) =>
    set((state) => ({
      value: {
        ...state.value,
        useSidebar: data,
      },
    })),
  menuChangeMenuPadding: (data: number) =>
    set((state) => ({
      value: {
        ...state.value,
        menuPadding: data,
      },
    })),
}));
