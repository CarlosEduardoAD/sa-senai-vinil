import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import PTBR from "./translations/pt-BR.json";
import ENUS from "./translations/en-US.json";

const resources = {
  "pt-BR": PTBR,
  "en-US": ENUS,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language,
    fallbackLng: "pt-BR"
  });

export default i18n;
