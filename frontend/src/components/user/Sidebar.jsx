import { React, useEffect, useState } from "react";
import { Switch } from "@material-tailwind/react";
import "../../css/user/sidebar.css";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentLangContext } from "../../context/LangContext";
import { useCurrentUserContext } from "../../context/UserContext";
import AlertDeconnexion from "./AlertDeconnexion";

export default function Sidebar({
  open,
  setOpen,
  showModal,
  setShowModal,
  userStatut,
  handleCheckedUserStatut,
}) {
  const { user, setUser } = useCurrentUserContext();
  const { t } = useTranslation();
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
      className={`${open ? "w-[290px]" : "w-[100px]"} ${
        dark ? "bg-light-blue" : "bg-dark-bg"
      }  duration-300 h-screen flex flex-col text-white`}
    >
      <AlertDeconnexion
        openModalAlertDeconnexion={openModalAlertDeconnexion}
        setOpenModalAlertDeconnexion={setOpenModalAlertDeconnexion}
        setLogoutIsConfirm={setLogoutIsConfirm}
      />
      {user?.is_admin === 1 ? (
        <div className="text-white mt-4 ml-2 flex">
          {" "}
          <Switch
            id="amber"
            color="amber"
            value={userStatut}
            onClick={handleCheckedUserStatut}
          />{" "}
          <p className={`${open ? "text-l mt-1 pl-3" : "hidden"}`}>Admin ?</p>
        </div>
      ) : null}
      {userStatut ? (
        <>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${
              open
                ? "w-7 h-7 absolute right-3 top-2 cursor-pointer"
                : "w-7 h-7 absolute right-3 top-2 cursor-pointer rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="">
            <NavLink to="/home" className="flex flex-row items-center pt-6">
              <div className="yellow-point mr-2" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${open ? "w-6 h-6 mr-2 pt-1" : "w-7 h-7 ml-3"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p className={`${open ? "text-xl mt-1" : "hidden"}`}>
                {t("Accueil page")}
              </p>
            </NavLink>
            <NavLink to="/decisions" className="flex flex-row items-center ">
              <div className="yellow-point mr-2 mt-3 " />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${
                  open ? "w-6 h-6 mr-2 mt-3" : "w-7 h-7 ml-3 mt-3"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
              <p className={`${open ? "text-xl mt-3" : "hidden"}`}>
                {t("Décisions page")}
              </p>
            </NavLink>
            <button
              type="button"
              onClick={handleNotificationModal}
              className="flex flex-row items-center "
            >
              <div className="yellow-point mr-2 mt-3" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${
                  open ? "w-6 h-6 mr-2 mt-3" : "w-7 h-7 ml-3 mt-3"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                />
              </svg>
              <p className={`${open ? "text-xl mt-3" : "hidden"}`}>
                {t("Mes notifications")}
              </p>
            </button>
            <NavLink to="/my-profile" className="flex flex-row items-center">
              <div className="yellow-point mr-2 mt-3" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${
                  open ? "w-6 h-6 mr-2 mt-3" : "w-7 h-7 ml-3 mt-3"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <p className={`${open ? "text-xl mt-3" : "hidden"}`}>
                {t("Mon profil")}
              </p>
            </NavLink>
            <button
              type="button"
              className="flex flex-row items-center"
              onClick={() => handleLogOut()}
            >
              <div className="yellow-point mr-2 mt-3" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`${
                  open ? "w-6 h-6 mr-2 mt-3" : "w-7 h-7 ml-3 mt-3"
                }`}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <p className={`${open ? "text-xl mt-3" : "hidden"}`}>
                {t("Se déconnecter")}
              </p>
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${
              open
                ? "w-7 h-7 absolute right-3 top-2 cursor-pointer"
                : "w-7 h-7 absolute right-3 top-2 cursor-pointer rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="">
            <NavLink
              to="/homeadmin"
              className="flex flex-row items-center pt-6"
            >
              <div className="yellow-point mr-2" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${
                  open ? "w-6 h-6 mr-2 pt-1 ml-1" : "w-7 h-7 ml-3"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p className={`${open ? "text-xl mt-1" : "hidden"}`}>
                {t("Accueil page")}
              </p>
            </NavLink>
            <NavLink to="/mailbox" className="flex flex-row items-center ">
              <div className="yellow-point mr-2 mt-3 " />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className={`${
                  open ? "w-7 h-7 mr-2 pt-2" : "w-8 h-8 ml-2 pt-2"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>

              <p className={`${open ? "text-xl mt-3" : "hidden"}`}>
                {t("Messagerie page")}
              </p>
            </NavLink>
            <NavLink to="/userslist" className="flex flex-row items-center ">
              <div className="yellow-point mr-2 mt-3 " />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className={`${
                  open ? "w-7 h-7 mr-2 pt-2" : "w-8 h-8 ml-2 pt-2"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>

              <p className={`${open ? "text-xl mt-3" : "hidden"}`}>
                {t("Liste d'utilisateurs")}
              </p>
            </NavLink>
            <NavLink to="/decisionsList" className="flex flex-row items-center">
              <div className="yellow-point mr-2 mt-3" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className={`${
                  open ? "w-7 h-7 mr-2 pt-2" : "w-8 h-8 ml-2 pt-2"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>

              <p className={`${open ? "text-xl mt-3" : "hidden"}`}>
                {t("Liste décisions")}
              </p>
            </NavLink>
            <button
              type="button"
              className="flex flex-row items-center"
              onClick={() => handleLogOut()}
            >
              <div className="yellow-point mr-2 mt-3" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`${
                  open ? "w-6 h-6 mr-2 mt-3 ml-1" : "w-7 h-7 ml-3 mt-3"
                }`}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <p className={`${open ? "text-xl mt-3 " : "hidden"}`}>
                {t("Se déconnecter")}
              </p>
            </button>
          </div>
        </>
      )}
      <div className="flex flex-row items-center pt-4">
        <div className={`${open ? "yellow-point mr-4" : "hidden"}`} />
        <p className={`${open ? "text-xl" : "hidden"}`}>
          {t("Changer de pays")}
        </p>
      </div>
      <div
        className={`${
          open ? "text-x font-light pl-8 pt-3" : "text-sm font-light pl-2"
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
      <div className="pl-2 pt-2 flex">
        <Switch
          id="indigo"
          color="indigo"
          value={dark}
          onClick={() => toggleDark()}
        />{" "}
        <p className={`${open ? "text-l mt-1 pl-3" : "hidden"}`}>
          {dark ? "Dark" : "Light"} ?
        </p>
      </div>
      <div
        className={`${open ? "block-color absolute bottom-36" : "hidden"}`}
      />
      <div className={`${open ? "absolute bottom-10 round-form" : "hidden"}`} />
      <div className={`${open ? "absolute bottom-20 left-20" : "hidden"}`}>
        <NavLink to="/help">
          <p className="text-sm font-normal">{t("Besoin d'aides ?")}</p>
        </NavLink>
        <NavLink to="/legal-notice">
          <p className="text-sm font-extralight">{t("Mentions légales")}</p>
        </NavLink>
        <br />
      </div>
    </div>
  );
}
