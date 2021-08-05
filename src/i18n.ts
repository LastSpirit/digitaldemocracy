import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Welcome'
    }
  },
  fr: {
    translation: {
      title: 'Bienvenue'
    }
  },
  ru: {
    translation: {
      title: 'Привет'
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    // resources,
    // lng: 'en',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    },
    debug: true,
    /*
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    */
  });

export default i18n;
