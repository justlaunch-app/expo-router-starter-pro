import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './en.json';
import es from './es.json';

const preferredLocale = Localization.getLocales()[0].languageTag;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  fallbackLng: 'en',
  lng: preferredLocale.split('-')[0],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
