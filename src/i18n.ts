import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "../public/locales/en/translation.json";
import frTranslations from "../public/locales/fr/translation.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  fr: {
    translation: frTranslations,
  },
};

i18n
  // Use the language detector
  .use(LanguageDetector)
  // Passes i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    resources,
    // fallback language is used if a translation is missing
    fallbackLng: "en",
    debug: false, // set to false in production

    // Configuration for the language detector plugin
    detection: {
      order: ["localStorage", "navigator"], // checks localStorage first, then browser settings
      caches: ["localStorage"], // enables caching the detected language in localStorage
    },

    interpolation: {
      escapeValue: false, // React already prevents XSS
    },
  });

export default i18n;
