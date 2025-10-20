import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {} // Will be loaded dynamically
      },
      es: {
        translation: {} // Will be loaded dynamically
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Load translations dynamically
fetch('/locales/en/translation.json')
  .then(res => res.json())
  .then(data => i18n.addResourceBundle('en', 'translation', data));

fetch('/locales/es/translation.json')
  .then(res => res.json())
  .then(data => i18n.addResourceBundle('es', 'translation', data));

export default i18n;
