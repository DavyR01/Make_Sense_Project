import React, { useEffect, useState } from "react";
import "../../css/user/decisionCard.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import iconTrash from "../../assets/icons/trash-orange.svg";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import AlertDeleteDecision from "./AlertDeleteDecision";
import userimg from "../../assets/icons/user.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function DecisionCard({
  valueDetailsDecision,
  updateArrayDecisionsAfterDelete,
}) {
  const { user, token } = useCurrentUserContext();
  const convertDateFromApi = (date) => {
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2].split("T")[0];

    return `${day}/${month}/${year}`;
  };
  const [openModalAlertDelete, setOpenModalAlertDelete] = useState(false);
  const { dark } = useCurrentDarkContext();
  const [deleteIsConfirm, setDeleteIsConfirm] = useState(false);
  const [urlAvatarStatus, setAvatarStatus] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  // for alert notification error delete decision after submit
  const notify = () =>
    toast.error(
      "Une erreure est survenue, veuillez recommencer ou contacter l'administrateur du site"
    );

  // function to convert status of decision from API to class name
  const statusForClassname = () => {
    if (valueDetailsDecision.status_decision) {
      return valueDetailsDecision.status_decision
        .replace(" ", "")
        .toLowerCase();
    }
    return "encours";
  };

  const handleDeleteDecision = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    toast
      .promise(
        fetch(`${backEnd}/decision/${valueDetailsDecision.id}`, {
          method: "delete",
          redirect: "follow",
          headers: myHeaders,
        }),
        {
          loading: "Suppression en cours",
          success: "La supression a bien été transmise",
          error:
            "Une erreur sur le serveur est survenue lors de la suppression",
        }
      )
      .then((response) => {
        if (response.status !== 204) {
          console.warn("error", response.status);
          notify();
        }
      })
      .then(() => {
        updateArrayDecisionsAfterDelete(valueDetailsDecision.id);
      })
      .catch((error) => console.warn("error", error));
  };

  useEffect(() => {
    if (deleteIsConfirm) {
      setOpenModalAlertDelete(false);
      handleDeleteDecision();
    } else {
      setDeleteIsConfirm(false);
    }
  }, [deleteIsConfirm]);

  // fetch avatar status
  useEffect(() => {
    fetch(`${backEnd}/avatar/${valueDetailsDecision.avatar}`)
      .then((response) => setAvatarStatus(response))
      .catch((error) => console.warn(error));
  }, [valueDetailsDecision]);

  return (
    <div
      className={`relative w-[250px] md:min-w-[200px] md:max-w-[210px] h-[180px] hover:scale-110 duration-200	md:mb-0 mb-3 bg-[#fcfcfc] px-4 py-4 sm:px-6 shadow-lg rounded-xl ${
        dark ? "" : "bg-dark-bg"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <AlertDeleteDecision
        openModalAlertDelete={openModalAlertDelete}
        setOpenModalAlertDelete={setOpenModalAlertDelete}
        setdeleteIsConfirm={setDeleteIsConfirm}
      />
      {valueDetailsDecision.user_id === user.id ? (
        <div className="flex justify-between">
          <div className={statusForClassname()} />
          <button type="button" onClick={() => setOpenModalAlertDelete(true)}>
            <div className="wrapForHide flex justify-center flex-row items-center group-hover:opacity-50">
              <span className="spanhidden text-xs text-slate-400">
                {t("Supprimer btn")}
              </span>
              <img className="" src={iconTrash} alt="trash" />
            </div>
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className={statusForClassname()} />
          <button
            type="button"
            onClick={() =>
              navigate(`/user-profile/${valueDetailsDecision.user_id}`)
            }
          >
            <div className="wrapForHide flex justify-center flex-row items-center group-hover:opacity-50">
              <span className="spanhidden text-xs text-right text-slate-400">
                {t("Voir le profil de")} {valueDetailsDecision.firstname}
              </span>
              <img
                className="w-10 h-10 rounded-full hover:opacity-25 transition ease-in-out delay-50"
                src={
                  urlAvatarStatus.status === 200
                    ? `${backEnd}/avatar/${valueDetailsDecision.avatar}`
                    : userimg
                }
                alt="avatar-decision"
              />
            </div>
          </button>
        </div>
      )}
      {/* {valueDetailsDecision ? ( */}
      <NavLink to={`/decision/${valueDetailsDecision.id}`}>
        <div className="flex items-center">
          <p
            className={`text-left mt-5 mb-5 ${
              dark ? "text-black" : "text-white"
            }`}
          >
            {valueDetailsDecision.title}
          </p>
        </div>
        <div className="border-t absolute bottom-3 ">
          <p className="text-xs font-thin text-left mt-2 text-gray-500">
            {t("Crée le")} :{" "}
            {convertDateFromApi(valueDetailsDecision.date_decision_creation)}
          </p>
          <p className="text-xs font-thin text-left text-gray-500">
            {t("Fin de conflit le")} :{" "}
            {convertDateFromApi(valueDetailsDecision.date_decision_final)}
          </p>
        </div>
      </NavLink>
      {/* ) : null} */}
    </div>
  );
}
