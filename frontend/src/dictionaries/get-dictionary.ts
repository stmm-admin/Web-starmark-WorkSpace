const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  th: () => import('./th.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'th') => 
  dictionaries[locale]?.() ?? dictionaries.th();
