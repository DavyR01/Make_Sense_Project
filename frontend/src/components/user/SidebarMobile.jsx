import { React, useEffect, useState } from "react";
import "../../css/user/sidebar.css";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { Switch } from "@material-tailwind/react";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentLangContext } from "../../context/LangContext";
import { useCurrentUserContext } from "../../context/UserContext";
import AlertDeconnexion from "./AlertDeconnexion";

export default function SidebarMobile({
  showModal,
  setShowModal,
  openMobile,
  setOpenMobile,
  checked,
  handleChecked,
}) {
  const { user, setUser } = useCurrentUserContext();
  const { lang, toggleLang } = useCurrentLangContext();
  const { dark, toggleDark } = useCurrentDarkContext();
  const [logoutIsConfirm, setLogoutIsConfirm] = useState(false);
  const [openModalAlertDeconnexion, setOpenModalAlertDeconnexion] =
    useState(false);

  const navigate = useNavigate();
  const handleNotificationModal = () => {
    setShowModal(!showModal);
  };

  const handleLogOut = () => {
    setOpenModalAlertDeconnexion(true);
  };
  const { t } = useTranslation();

  useEffect(() => {
    if (logoutIsConfirm === true) {
      localStorage.removeItem("token");
      navigate("/");
      setUser({});
    } else {
      setLogoutIsConfirm(false);
    }
  }, [logoutIsConfirm]);

  return (
    <div
      className={`${!openMobile ? "h-[50px]" : "h-[500px]"} ${
        dark ? `bg-light-blue` : "bg-dark-bg"
      }
      bg-light-blue duration-300 md:w-screen flex flex-col justify-between text-white z-40`}
    >
      {openMobile ? (
        <div className="h-[500px] flex flex-col items-center z-40">
          <div className="flex flex-row mt-4 mb-[20px]">
            {user?.is_admin === 1 ? (
              <div className="text-white mt-4 mx-4 flex">
                {" "}
                <Switch
                  id="amber"
                  color="amber"
                  value={checked}
                  onClick={handleChecked}
                />{" "}
                <p className={`${openMobile ? "text-l mt-1 ml-3" : ""}`}>
                  Admin ?
                </p>
              </div>
            ) : null}
            <div className="text-white mt-4 mx-4 flex">
              <Switch
                id="indigo"
                color="indigo"
                value={dark}
                onClick={toggleDark}
              />{" "}
              <p className={`${openMobile ? "text-l mt-1 ml-3" : ""}`}>
                Dark ?
              </p>
            </div>
          </div>
          {checked ? (
            <div className="mt-[20px] ">
              <NavLink
                to="/home"
                className="flex flex-row items-center"
                onClick={() => setOpenMobile(!openMobile)}
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2 pt-1" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <p className={`${openMobile ? "text-xl mt-1" : ""}`}>
                  {t("Accueil page")}
                </p>
              </NavLink>
              <NavLink
                to="/decisions"
                className="flex flex-row items-center mt-4"
                onClick={() => setOpenMobile(!openMobile)}
              >
                <div className="yellow-point mr-2 " />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Décisions page")}
                </p>
              </NavLink>
              <button
                type="button"
                onClick={handleNotificationModal}
                className="flex flex-row items-center mt-4"
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                  />
                </svg>
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Mes notifications")}
                </p>
              </button>
              <NavLink
                to="/my-profile"
                className="flex flex-row items-center mt-4"
                onClick={() => setOpenMobile(!openMobile)}
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Mon profil")}
                </p>
              </NavLink>
              <button
                type="button"
                className="flex flex-row items-center mt-4"
                onClick={() => handleLogOut()}
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2" : ""}`}
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Se déconnecter")}
                </p>
              </button>
              <div className="flex flex-row items-center mt-4">
                <div className={`${openMobile ? "yellow-point mr-4" : ""}`} />
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Changer de pays")}
                </p>
              </div>
              <div
                className={`${
                  openMobile
                    ? "text-x font-light pl-8 pt-3"
                    : "text-sm font-light pl-2"
                }`}
              >
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
          ) : (
            <div className="mt-[20px] ">
              <NavLink
                to="/homeadmin"
                className="flex flex-row items-center"
                onClick={() => setOpenMobile(!openMobile)}
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${
                    openMobile ? "w-6 h-6 mr-2 pt-1" : "w-7 h-7 ml-3"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <p className={`${openMobile ? "text-xl mt-1" : ""}`}>
                  {t("Accueil page")}
                </p>
              </NavLink>
              <NavLink
                to="/mailbox"
                className="flex flex-row items-center mt-4"
                onClick={() => setOpenMobile(!openMobile)}
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2" : "w-7 h-7 ml-3"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Messagerie page")}
                </p>
              </NavLink>
              <NavLink
                to="/userslist"
                className="flex flex-row items-center mt-4"
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className={`${openMobile ? "w-7 h-7 mr-2 pt-2" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>

                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Liste d'utilisateurs")}
                </p>
              </NavLink>
              <NavLink
                to="/decisionsList"
                className="flex flex-row items-center mt-4"
                onClick={() => setOpenMobile(!openMobile)}
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Liste décisions")}
                </p>
              </NavLink>
              <button
                type="button"
                className="flex flex-row items-center mt-4"
                onClick={() => handleLogOut()}
              >
                <div className="yellow-point mr-2" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={`${openMobile ? "w-6 h-6 mr-2" : ""}`}
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Se déconnecter")}
                </p>
              </button>
              <div className="flex flex-row items-center pt-4">
                <div className={`${openMobile ? "yellow-point mr-4" : ""}`} />
                <p className={`${openMobile ? "text-xl" : ""}`}>
                  {t("Changer de pays")}
                </p>
              </div>
              <div
                className={`${
                  openMobile
                    ? "text-x font-light pl-8 pt-3"
                    : "text-sm font-light pl-2"
                }`}
              >
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
          )}
        </div>
      ) : (
        ""
      )}

      <div>
        <AlertDeconnexion
          openModalAlertDeconnexion={openModalAlertDeconnexion}
          setOpenModalAlertDeconnexion={setOpenModalAlertDeconnexion}
          setLogoutIsConfirm={setLogoutIsConfirm}
        />
        <div className="flex flex-col justify-end items-center pb-4 h-[50px] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${
              openMobile
                ? "w-6 h-6 stroke-white   "
                : "w-6 h-6 stroke-white rotate-180 "
            }`}
            onClick={() => setOpenMobile(!openMobile)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
