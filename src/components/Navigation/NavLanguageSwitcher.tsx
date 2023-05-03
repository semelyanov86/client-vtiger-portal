import { ToggleMetadata } from '@restart/ui/Dropdown';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

import { MENU_PLACEMENT } from '../../config/constants.ts';
import { useLanguagesStore } from '../../stores/languages.ts';
import { useLayoutsStore } from '../../stores/layouts.ts';
import { useMenusStore } from '../../stores/menus.ts';
import { useSettingsStore } from '../../stores/settings.ts';

const MENU_NAME = 'NavLanguageSwitcher';

export const NavLanguageSwitcher = () => {
  const {
    behaviourStatus: { behaviourHtmlData },
    placementStatus: { view: placement },
    attrMobile,
    attrMenuAnimate,
  } = useMenusStore().value;

  const { color } = useSettingsStore().value;
  const { showingNavMenu, layoutShowingNavMenu } = useLayoutsStore();
  const { languages, currentLang, changeLang } = useLanguagesStore();

  const onSelectLang = (code: string) => {
    changeLang(code);
  };
  const onToggle = (status: boolean, event: ToggleMetadata) => {
    if (event && event.originalEvent && event.originalEvent.stopPropagation)
      event.originalEvent.stopPropagation();
    layoutShowingNavMenu(status ? MENU_NAME : '');
  };

  useEffect(() => {
    layoutShowingNavMenu('');
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color]);

  return (
    <div className="language-switch-container">
      <Dropdown onToggle={onToggle} show={showingNavMenu === MENU_NAME} align="end">
        <Dropdown.Toggle
          variant="empty"
          className={classNames('language-button', {
            show: showingNavMenu === MENU_NAME,
          })}
        >
          {currentLang.code}
        </Dropdown.Toggle>

        <Dropdown.Menu
          popperConfig={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: () => {
                    if (placement === MENU_PLACEMENT.Vertical) {
                      return [6, 7];
                    }
                    return [0, 7];
                  },
                },
              },
            ],
          }}
        >
          {languages.map((lang) => (
            <Dropdown.Item key={lang.locale} onClick={() => onSelectLang(lang.code)}>
              {lang.code}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
