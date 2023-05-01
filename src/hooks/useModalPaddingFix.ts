import { useCallback } from 'react';

import { useMenusStore } from '../stores/menus.ts';

import { useMutationObservable } from './useMutationObservable';

const useModalPaddingFix = () => {
  const { menuChangeMenuPadding } = useMenusStore();

  const onListMutation = useCallback(
    (mutationList: MutationRecord[]) => {
      if (Array.isArray(mutationList)) {
        mutationList.map((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const targetElement = mutation.target as HTMLElement;
            menuChangeMenuPadding(
              targetElement.style.paddingRight.indexOf('px') > -1
                ? parseInt(targetElement.style.paddingRight.replace('px', ''), 10)
                : 0
            );
          }
        });
      }
    },
    [menuChangeMenuPadding]
  );
  useMutationObservable(document.body, onListMutation);

  return true;
};
export default useModalPaddingFix;
