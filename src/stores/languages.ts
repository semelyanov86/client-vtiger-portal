import { create } from 'zustand';

export interface Language {
  code: string;
  locale: string;
  direction: string;
}

interface Languages {
  languages: Language[];
  currentLang: Language;
  changeLang: (locale: string) => void;
}

export const languageList = [
  { code: 'EN', locale: 'en-US', direction: 'ltr' },
  { code: 'RU', locale: 'ru-RU', direction: 'ltr' },
  { code: 'DE', locale: 'de-DE', direction: 'ltr' },
] as Language[];

const findOrDefault = (key: string) => {
  return languageList.find((x) => x.locale === key || x.code === key) || languageList[0];
};

const navigatorLang = (navigator.languages && navigator.languages[0]) || navigator.language;

export const useLanguagesStore = create<Languages>((set) => ({
  languages: languageList,
  currentLang: findOrDefault(navigatorLang),
  changeLang: (locale: string) =>
    set(() => ({
      currentLang: findOrDefault(locale),
    })),
}));
