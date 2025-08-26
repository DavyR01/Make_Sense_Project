import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import ModalMessage from "../../components/administrator/ModalMessage";
import AlertDeleteDecision from "../../components/user/AlertDeleteDecision";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import useApiCall from "../../hooks/useApiCall";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Messages() {
  const [messages, setMessages] = useState([]);
  const { user } = useCurrentUserContext();
  const [openModalAlertDelete, setOpenModalAlertDelete] = useState(false);
  const apiCall = useApiCall();
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [deleteIsConfirm, setDeleteIsConfirm] = useState(false);
  const [id, setId] = useState();
  const { t } = useTranslation();
  const { dark } = useCurrentDarkContext();

  useEffect(() => {
    apiCall(`${backEnd}/admin/message`)
      .then((res) => res.json())
      .then((result) => {
        setMessages(result);
      })
      .catch((err) => console.error(err));
  }, [apiCall]);

  const deleteMessage = () => {
    apiCall(`${backEnd}/admin/message/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMessages(messages.filter((message) => message.id !== id));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (deleteIsConfirm) {
      setOpenModalAlertDelete(false);
      deleteMessage();
      setDeleteIsConfirm(false);
    } else {
      setDeleteIsConfirm(false);
    }
  }, [deleteIsConfirm]);

  // console.log(messages);

  useEffect(() => {
    document.body.classList.add(dark ? "bg-white" : "bg-dark-header");
    return () => {
      document.body.classList.remove(dark ? "bg-white" : "bg-dark-header");
    };
  }, [dark]);

  return (
    <div
      className={` w-screen z-0 ${
        // className={` w-screen z-0 sm-max:overflow-y-hidden h-screen ${
        dark ? "text-black" : "text-white bg-dark-header"
      }`}
    >
      <AlertDeleteDecision
        openModalAlertDelete={openModalAlertDelete}
        setOpenModalAlertDelete={setOpenModalAlertDelete}
        setdeleteIsConfirm={setDeleteIsConfirm}
      />

      <div
        className={`flex flex-row items-center justify-between pr-16 pl-10
          ${
            dark
              ? "text-black bg-light-grey"
              : "text-white bg-dark-header border-b-2 border-dark-bg"
          }`}
      >
        <div className="flex flex-col">
          {user ? (
            <p className="pl-10 pt-3 text-xl">{t("Message")} </p>
          ) : (
            <p className="pl-10 pt-3 text-xl">{t("Bonjour home")}</p>
          )}
          <p className="pl-10 text-x font-extralight">
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

      {/* CREATION COLUMNS */}

      <div
        className={`md:w-[95%] m-auto h-auto w-640  ${
          dark ? "text-black" : "text-white"
        }`}
      >
        <div
          className={`grid grid-cols-6 items-center ${
            dark ? "bg-dark-blue text-white" : "bg-dark-bg border-gray-400"
          }  h-12 mt-10 justify-center rounded-sm`}
        >
          {/* <BsTrash className="w-12 h-5" /> */}

          <p className="col-start-2 text-center">{t("Nom, prénom")}</p>
          <p className="col-start-3 col-end-5 text-center">Email</p>
          <p className="col-start-5 col-end-7 text-center">{t("Titre")}</p>
        </div>
        <div className="mb-16">
          {messages.map((message) => (
            <div
              type="button"
              key={message.id}
              className={
                message.id % 2 === 0
                  ? `grid pt-2 pb-2 grid-cols-6 items-center ${
                      dark ? "bg-gray-200" : "bg-dark-header"
                    }  h-auto min-h-min	justify-center border-b-2 border-gray-400	w-full `
                  : `grid pt-2 pb-2 grid-cols-6 items-center${
                      dark ? "bg-gray-300" : "bg-dark-header"
                    } h-auto min-h-min	justify-center hover:bg-gray-400 hover:text-black border-b-2 border-gray-400	w-full `
              }
            >
              <button
                type="button"
                onClick={() => {
                  setOpenModalAlertDelete(true);
                  setId(message.id);
                }}
              >
                <BsTrash className="w-12 h-5" />
              </button>
              <p className="col-start-2 text-center">{message.username}</p>
              <p className="col-start-3 col-end-5 text-center">
                {message.email}
              </p>
              <button
                type="button"
                className="col-start-5 col-end-7 text-center"
                onClick={() => setShowModalMessage(true)}
              >
                <p>{message.objet}</p>
              </button>
              <ModalMessage
                showModalMessage={showModalMessage}
                setShowModalMessage={setShowModalMessage}
                message={message}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;
