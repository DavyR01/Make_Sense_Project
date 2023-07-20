import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/user/Profile.css";
import { useTranslation } from "react-i18next";
import Randomuser from "../../assets/randomuser.jpg";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import DecisionCard from "../../components/user/DecisionCard";
import { useCurrentUserContext } from "../../context/UserContext";
import { useCurrentDarkContext } from "../../context/DarkContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function UserProfile() {
  const { user, token } = useCurrentUserContext();
  const { dark } = useCurrentDarkContext();
  const idParam = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [valuesDetailsDecision, setValuesDetailsDecision] = useState([]);
  const [valuesUser, setValuesUser] = useState({});
  const [urlAvatar, setUrlAvatar] = useState("");
  const [urlAvatarStatus, setAvatarStatus] = useState("");

  // if we click on our avatar we are redirected directly to /my-profil
  if (+user.id === +idParam.id) {
    navigate(`/my-profile`);
  }

  // fetch user info by user id
  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${backEnd}/user/${idParam.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setValuesUser(result);
        setUrlAvatar(result.avatar);
      })
      .catch((error) => console.warn("error", error));
  }, []);

  // fetch for the status of fetch of the avatar
  useEffect(() => {
    fetch(`${backEnd}/avatar/${urlAvatar}`)
      .then((response) => setAvatarStatus(response))
      .catch((error) => console.warn(error));
  }, [valuesDetailsDecision]);

  // fetch decisions infos by user id
  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${backEnd}/decision-byuser/${idParam.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setValuesDetailsDecision(result))
      .catch((error) => console.warn("error", error));
  }, []);

  return (
    <div className={`w-screen ${dark ? "" : "bg-dark-header text-white"}`}>
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
              {t("Bonjour home")} {user.firstname}
            </p>
          ) : (
            <p className="pl-10 pt-3 text-xl">{t("Bonjour home")}</p>
          )}
          <p className="pl-10 text-x font-extralight pb-2">
            {t("Nous sommes le")} : {new Date().toLocaleDateString()}
          </p>
        </div>
        <h1 className="hidden md:flex text-2xl text-red-pink">
          {t("Profil de")} {`${valuesUser.firstname} ${valuesUser.lastname}`}
        </h1>
        <div className="logo-home hidden md:flex ">
          {dark ? (
            <img src={Logo} alt="logo make-sense" />
          ) : (
            <img src={LogoWhite} alt="logo make-sense" />
          )}
        </div>
      </div>
      <main>
        <div className="userProfile-Description flex-col md:flex-row mt-14 text-xl flex flex-wrap ml-4 md:ml-24 md:gap-12 md:gap-x-32">
          <div className="">
            <img
              className="rounded-full w-32 md:w-[200px]"
              src={
                urlAvatarStatus.status === 200
                  ? `${backEnd}/avatar/${urlAvatar}`
                  : Randomuser
              }
              alt="Avatar"
            />
          </div>
          <div className="flex flex-col mt-10 gap-y-5 md:gap-y-20 justify-center">
            <h3>
              <span className="text-gray-400"> {t("Prénom input")} :</span>{" "}
              {valuesUser.firstname}
            </h3>
            <h3>
              <span className="text-gray-400"> {t("Nom input")} :</span>{" "}
              {valuesUser.lastname}
            </h3>
            <h3>
              <span className="text-gray-400">
                {" "}
                {t("Localisation input")} :
              </span>{" "}
              {valuesUser.city ? valuesUser.city : "Non renseigné"}
            </h3>
          </div>
          <div className="flex flex-col gap-y-5 md:gap-y-20 md:mt-6">
            <h3 className="mt-5">
              <span className="text-gray-400"> {t("Téléphone input")} :</span>{" "}
              {valuesUser.phone ? valuesUser.phone : "Non renseigné"}
            </h3>
            <h3>
              <span className="text-gray-400"> Email :</span>{" "}
              {valuesUser.email ? valuesUser.email : "Non renseigné"}
            </h3>
          </div>
        </div>
        <h2 className="ml-10 mt-10 text-2xl mb-5">
          {t("Les décisions de")} {valuesUser.firstname} :
        </h2>
        <div className="flex flex-col items-center md:grid md:grid-cols-3 lg:grid-cols-4 md:items-start mt-3 ">
          <div className="box col-start-1 col-end-4 md:ml-10">
            <div className="grid mb-16 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {valuesDetailsDecision.map((valueDetailsDecision) => {
                return (
                  <DecisionCard
                    key={valueDetailsDecision.id}
                    valueDetailsDecision={valueDetailsDecision}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
