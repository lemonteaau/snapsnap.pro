// src/lib/i18n.ts
"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import commonEn from '../../public/locales/en/translation.json';
import commonZh from '../../public/locales/zh/translation.json';

const resources = {
  en: {
    translation:commonEn
  },
  zh: {
    translation:commonZh
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
