import React from "react";
import { useTranslation } from "react-i18next";
import { useCurrentLangContext } from "../../context/LangContext";

export default function HeaderCountryChoice() {
  const { lang, toggleLang } = useCurrentLangContext();

  const { t } = useTranslation();

  return (
    <div className=" pl-10 sm:pl-20 pr-10 sm:pr-20 h-14 sm:h-12 md:h-8 md:w-screen flex items-center bg-light-grey justify-between">
      <div className="flex items-center">
        <div className="h-3 w-6 bg-dark-blue rounded-md " />
        <div className="ml-8">{t("Changer de pays")}</div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => toggleLang("FR")}
          className={lang === "FR" ? "font-extrabold ml-2" : "ml-2"}
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => toggleLang("EN")}
          className={lang === "EN" ? "font-extrabold ml-2" : "ml-2"}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => toggleLang("ES")}
          className={lang === "ES" ? "font-extrabold ml-2" : "ml-2"}
        >
          ES
        </button>
      </div>
    </div>
  );
}
