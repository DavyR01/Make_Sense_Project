import { createContext, useState, useContext, useEffect } from "react";
import i18n from "../i18n";

const CurrentLangContext = createContext();

export default CurrentLangContext;

export function CurrentLangContextProvider({ children }) {
  const [lang, setLang] = useState("FR");

  const toggleLang = (changeLang) => {
    setLang(changeLang);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <CurrentLangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </CurrentLangContext.Provider>
  );
}

export const useCurrentLangContext = () => useContext(CurrentLangContext);
