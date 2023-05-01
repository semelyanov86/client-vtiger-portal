import { useEffect } from 'react';
import useModalPaddingFix from './useModalPaddingFix';
import { useSettingsStore } from '../stores/settings.ts';
import { useMenusStore } from '../stores/menus.ts';

const useLayout = () => {
  const { value, setThemeValues } = useSettingsStore();
  const { color, layout, radius, navColor } = value;

  const {
    attrMenuAnimate,
    attrMobile,
    placementStatus: { placementHtmlData, dimensionHtmlData },
    behaviourStatus: { behaviourHtmlData },
  } = useMenusStore().value;

  useModalPaddingFix();

  const htmlTag = document.documentElement;
  useEffect(() => {
    setTimeout(() => {
      // setThemeValues for charts colors
      setThemeValues();
      htmlTag.setAttribute('data-show', 'true');
    }, 30);
    htmlTag.setAttribute('data-color', color);
    htmlTag.setAttribute('data-layout', layout);
    htmlTag.setAttribute('data-radius', radius);
    htmlTag.setAttribute('data-navcolor', navColor);
    htmlTag.setAttribute('data-placement', placementHtmlData);
    htmlTag.setAttribute('data-dimension', dimensionHtmlData);
    htmlTag.setAttribute('data-behaviour', behaviourHtmlData);
    return () => {
      htmlTag.removeAttribute('data-color');
      htmlTag.removeAttribute('data-layout');
      htmlTag.removeAttribute('data-radius');
      htmlTag.removeAttribute('data-navcolor');
      htmlTag.removeAttribute('data-show');
      htmlTag.removeAttribute('data-placement');
      htmlTag.removeAttribute('data-behaviour');
      htmlTag.removeAttribute('data-dimension');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    htmlTag.setAttribute('data-placement', placementHtmlData);
    htmlTag.setAttribute('data-dimension', dimensionHtmlData);
    htmlTag.setAttribute('data-behaviour', behaviourHtmlData);
    htmlTag.setAttribute('data-navcolor', navColor);
    htmlTag.setAttribute('data-radius', radius);
    htmlTag.setAttribute('data-color', color);
    htmlTag.setAttribute('data-layout', layout);
  }, [
    htmlTag,
    placementHtmlData,
    dimensionHtmlData,
    behaviourHtmlData,
    navColor,
    radius,
    color,
    layout,
  ]);

  useEffect(() => {
    if (attrMenuAnimate) htmlTag.setAttribute('data-menu-animate', attrMenuAnimate);
    else htmlTag.removeAttribute('data-menu-animate');
  }, [htmlTag, attrMenuAnimate]);

  useEffect(() => {
    if (attrMobile) htmlTag.setAttribute('data-mobile', String(attrMobile));
    else htmlTag.removeAttribute('data-mobile');
  }, [htmlTag, attrMobile]);

  return true;
};
export default useLayout;
