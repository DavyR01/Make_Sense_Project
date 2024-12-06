import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-makesense.png";
import HeaderCountryChoice from "../../components/user/HeaderCountryChoice";
import { useCurrentUserContext } from "../../context/UserContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function Help() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [content, setContent] = useState("");
  const { token } = useCurrentUserContext();
  const { t } = useTranslation();

  // for alert notification error edit decision after submit
  const notify = () =>
    toast.error(
      "Une erreure est survenue, veuillez vérifier que vous avez bien rempli tous les champs"
    );

  const sendMessage = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      email,
      objet,
      content,
    });
    toast
      .promise(
        fetch(`${backEnd}/admin/addmessage`, {
          method: "POST",
          redirect: "follow",
          body: raw,
          headers: myHeaders,
        }),
        {
          loading: "Envoi en cours",
          success: "Message envoyé !",
          error:
            "Une erreur sur le serveur est survenue lors de l'envoi de votre message",
        }
      )
      .then((response) => {
        if (response.status === 201) {
          console.warn("ok");
          setUsername("");
          setEmail("");
          setObjet("");
          setContent("");
        } else {
          notify();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <HeaderCountryChoice />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-32 m-8">
        <NavLink to="/">
          <img className="h-12" src={Logo} alt="logo MakeSense" />
        </NavLink>
      </div>
      <div className="flex items-center ml-6">
        {token ? (
          <div className="cursor-pointer">
            <NavLink
              className="flex items-center gap-3 mr-4 mb-2 border-gray-800 border p-2 border-dashed hover:bg-dark-blue hover:text-white rounded-xl"
              to="/home"
            >
              <MdOutlineManageAccounts className="min-w-5" size={20} />
              {t("Retour espace")}
            </NavLink>
          </div>
        ) : (
          <div className="cursor-pointer">
            <NavLink
              className="flex items-center gap-3 mr-4 mb-2 border-gray-800 border p-2 border-dashed hover:bg-dark-blue hover:text-white rounded-xl"
              to="/"
            >
              <IoHomeSharp className="min-w-5" size={20} />
              {t("Retour connexion")}
            </NavLink>
          </div>
        )}
      </div>{" "}
      <div className="h-auto w-screen bg-dark-blue ">
        <p className="text-flash-yellow pl-20 pt-8 pb-8 text-7xl">
          Besoin d'aide ?
        </p>
        <p className="text-white pl-20 pb-20 pr-20 w-4/5 font-thin text-3xl">
          Une question ? Une suggestion ? Nous sommes là pour vous renseigner.
          Veuillez remplir le formulaire ci-dessous et nous vous répondrons dans
          les plus brefs délais.
        </p>
      </div>
      <div className="w-3/5 flex flex-col m-auto pt-8">
        <label className="flex flex-col text font-light">
          Prénom, Nom:
          <input
            className="mt-3 border-2 rounded-lg h-10"
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John Doe"
          />
        </label>
        <label className="flex flex-col mt-4 text font-light">
          Email :
          <input
            className="mt-3 border-2 rounded-lg h-10"
            type="email"
            name="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john.doe@gmail.com"
          />
        </label>
        <label className="flex flex-col mt-4 text font-light">
          Objet :
          <input
            className="mt-3 border-2 h-10 rounded-lg"
            type="text"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            name="message"
          />
        </label>
        <label className="flex flex-col mt-4 mb-10 font-light">
          Message :
          <input
            className="mt-3 border-2 h-20 rounded-lg"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="message"
          />
        </label>
        <button
          className="mt-3 mb-4 border-2 border-red-pink w-20 rounded-lg"
          onClick={sendMessage}
          type="submit"
        >
          <div className="flex lg:block p-2 bg-red-pink text-white hover:bg-white hover:text-red-pink hover:border-2 hover:border-red-pink transition duration-200 ease-in-out">
            Envoyer
          </div>
        </button>
      </div>
    </div>
  );
}
