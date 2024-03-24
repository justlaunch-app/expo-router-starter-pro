/**
 * i18n.ts
 *
 * This file contains the configuration for Internationalization (i18n) in the application.
 * It is responsible for setting up the application's language and translation resources.
 *
 * @see https://react.i18next.com
 *
 * You can change the language by modifying the resources object. You can also add more languages by creating a new object.
 *
 * For adding custom translations to the base en.json and es.json you need to add the translation to the respective file.
 *
 */

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
