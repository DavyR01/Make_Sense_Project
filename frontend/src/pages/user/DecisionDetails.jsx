import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import AccordionDecisionDetails from "../../components/user/AccordionDecisionDetails";
import userimg from "../../assets/icons/user.png";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import TimelineStepperDecision from "../../components/user/TimelineStepperDecision";
import "../../css/user/createDecision.css";
import { useCurrentUserContext } from "../../context/UserContext";
import { useCurrentDarkContext } from "../../context/DarkContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function DecisionDetails() {
  const idParam = useParams();
  const { t } = useTranslation();
  const { user, token } = useCurrentUserContext();
  const { dark } = useCurrentDarkContext();
  const [clickedAnswer4, setClickedAnswer4] = useState(false);
  const [valuesDetailsDecision, setValuesDetailsDecision] = useState([]);
  const [urlAvatarStatus, setAvatarStatus] = useState("");
  const [updateDecision, setUpdateDecision] = useState(false);
  const navigate = useNavigate();

  const toggleUpdateDecision = () => setUpdateDecision(!updateDecision);

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${backEnd}/decision/${idParam.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setValuesDetailsDecision(result);
      })
      .catch((error) => console.warn("error", error));
  }, [updateDecision]);

  useEffect(() => {
    fetch(`${backEnd}/avatar/${valuesDetailsDecision.avatar}`)
      .then((response) => setAvatarStatus(response))
      .catch((error) => console.warn(error));
  }, [valuesDetailsDecision]);

  const statusForClassname = () => {
    if (valuesDetailsDecision.status_decision) {
      return valuesDetailsDecision.status_decision
        .replace(" ", "")
        .toLowerCase();
    }
    return "encours";
  };

  return (
    <div
      className={`flex flex-col w-screen overflow-hidden ${
        dark ? "" : "bg-dark-header text-white"
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
            <p className="pt-3 text-xl">
              {t("Bonjour home")} {user.firstname}
            </p>
          ) : (
            <p className=" pt-3 text-xl">{t("Bonjour home")}</p>
          )}
          <p className="text-x font-extralight text-gray-500 pb-2">
            {t("Nous sommes le")} : {new Date().toLocaleDateString()}
          </p>
        </div>
        <h1 className="md:text-2xl text-red-pink hidden">
          {t("Détails de la décision")}
        </h1>
        <div className="hidden md:block logo-home">
          {dark ? (
            <img src={Logo} alt="logo make-sense" />
          ) : (
            <img src={LogoWhite} alt="logo make-sense" />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse  justify-around mt-10">
        <div className="hidden lg:flex lg:flex-col">
          <TimelineStepperDecision
            clickedAnswer4={clickedAnswer4}
            setClickedAnswer4={setClickedAnswer4}
            valuesDetailsDecision={valuesDetailsDecision}
            urlAvatarStatus={urlAvatarStatus}
          />
        </div>

        <div className="flex flex-col md:mr-10 mx-2 md:ml-10">
          <div className="flex flex-col ml-3">
            <div className="border-b mb-3">
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-xs font-thin text-left mt-2 text-gray-500">
                    {t("Crée le")} :{" "}
                    {valuesDetailsDecision?.date_decision_creation
                      ?.slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                  <p className="text-xs font-thin text-left text-gray-500 mb-3">
                    {t("Fin de conflit le")} :{" "}
                    {valuesDetailsDecision?.date_decision_conflict
                      ?.slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                </div>
                <div className="flex flex-col md:mr-10 ml-2 mb-3">
                  {valuesDetailsDecision.user_id === user.id ? (
                    <button
                      type="button"
                      onClick={() => navigate(`/edit-decision/${idParam.id}`)}
                      className="pr-3 pl-3 h-10 w-48 bg-dark-blue rounded-xl text-white text-s"
                    >
                      {t("Modifier ma décision")}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center ">
                <div className={statusForClassname()} />
                <p
                  className={`${
                    valuesDetailsDecision.status_decision === "En cours"
                      ? "text-light-blue "
                      : valuesDetailsDecision.status_decision === "En conflit"
                      ? "text-light-orange"
                      : valuesDetailsDecision.status_decision === "Non aboutie"
                      ? "text-red-pink "
                      : valuesDetailsDecision.status_decision === "Terminee"
                      ? "text-light-green"
                      : " "
                  }`}
                >
                  &nbsp; {valuesDetailsDecision.status_decision}
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <h2 className="text-2xl">{valuesDetailsDecision.title}</h2>
              {/* Here the status color changes according to the decision status */}
            </div>
          </div>

          <div className="flex flex-row justify-end">
            <p className="mt-2 mr-3">
              {t("Proposé par")} {valuesDetailsDecision.firstname} :
            </p>
            <button
              type="button"
              onClick={() =>
                navigate(`/user-profile/${valuesDetailsDecision.user_id}`)
              }
            >
              <img
                className="w-10 h-10 rounded-full hover:opacity-25 transition ease-in-out delay-50 mr-3"
                src={
                  urlAvatarStatus.status === 200
                    ? `${backEnd}/avatar/${valuesDetailsDecision.avatar}`
                    : userimg
                }
                alt={`avatar${user.firstname}-${user.id}`}
              />
            </button>
          </div>
          <div className="flex justify-center mb-16 overflow-hidden">
            <AccordionDecisionDetails
              clickedAnswer4={clickedAnswer4}
              setClickedAnswer4={setClickedAnswer4}
              valuesDetailsDecision={valuesDetailsDecision}
              setValuesDetailsDecision={setValuesDetailsDecision}
              urlAvatarStatus={urlAvatarStatus}
              toggleUpdateDecision={toggleUpdateDecision}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
