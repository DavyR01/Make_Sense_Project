import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UsersCard from "../../components/administrator/UsersCard";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import { useCurrentUserContext } from "../../context/UserContext";
import { useCurrentDarkContext } from "../../context/DarkContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function HomeAdmin({ open }) {
  const { user, token } = useCurrentUserContext();
  const { dark } = useCurrentDarkContext();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };
    fetch(`${backEnd}/user`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => console.error(err));

    fetch(`${backEnd}/admin/countstats`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setStats(result);
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div
      className={`w-screen z-0${
        dark ? "text-black" : "text-white bg-dark-header"
      }`}
    >
      <div
        className={`flex flex-row items-center justify-between bg-light-grey pr-16 pl-10
          ${
            dark
              ? "text-black"
              : "text-white bg-dark-header border-b-2 border-dark-bg"
          }`}
      >
        <div className="flex flex-col">
          {user ? (
            <p className="pl-10 pt-3 text-xl">
              {t("Administrateur")} {user.firstname}
            </p>
          ) : (
            <p className="pl-10 pt-3 text-xl">{t("Bonjour home")}</p>
          )}
          <p className="pl-10 text-x font-extralight pb-2">
            {t("Nous sommes le")} : {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="logo-home mr-3 md:mr-3">
          {dark ? (
            <img src={Logo} alt="logo make-sense" />
          ) : (
            <img src={LogoWhite} alt="logo make-sense" />
          )}
        </div>
      </div>
      <div
        className={`${
          dark ? "text-black" : "text-white bg-dark-header"
        } flex md:flex-row flex-col`}
      >
        <div className="md:w-[300px] h-[350px] border-2 rounded-xl m-10 md:flex md:flex-col shadow-lg grid grid-cols-4 grid-rows-4">
          <h3 className="text-center text-2xl md:mt-3  col-start-1 col-end-5">
            {t("Administrateur")} :
          </h3>
          <li className="font-extralight list-none text-center md:pt-3 md:m-3 row-start-2 row-end-3 col-start-1 col-end-3">
            {t("Utilisateurs")} : {stats.users}
          </li>
          <li className="font-extralight list-none text-center md:m-3 row-start-3 row-end-4 col-start-1 col-end-3">
            {t("Decisions")} : {stats.decision}
          </li>
          <li className="font-extralight list-none text-center md:m-3 row-start-4 row-end-5 col-start-1 col-end-3">
            {t("Terminées")} : {stats.finished}
          </li>
          <li className="font-extralight list-none text-center md:m-3 row-start-2 row-end-3 col-start-3 col-end-5">
            {t("En cours")} : {stats.inprogress}
          </li>
          <li className="font-extralight list-none text-center md:m-3 row-start-3 row-end-4 col-start-3 col-end-5">
            {t("Conflits")} : {stats.conflict}
          </li>
          <li className="font-extralight list-none text-center md:m-3 row-start-4 row-end-5 col-start-3 col-end-5">
            {t("Non abouties")} : {stats.unresolved}
          </li>
        </div>
        <div
          className={
            open
              ? "md:w-[750px] h-auto  border-2 rounded-xl md:m-10 m-2"
              : "md:w-[900px] h-auto  border-2 rounded-xl md:m-10 m-2"
          }
        >
          <h3 className="text-center text-2xl mt-5">{t("Utilisateurs")} :</h3>
          {users.map((appUser) => (
            <UsersCard key={appUser.id} user={appUser} />
          ))}
        </div>
      </div>
    </div>
  );
}
