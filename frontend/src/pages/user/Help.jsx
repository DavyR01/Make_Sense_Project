import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import HeaderCountryChoice from "../../components/user/HeaderCountryChoice";
import Logo from "../../assets/logo-makesense.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function Help() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [content, setContent] = useState("");

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
        <img className="h-12" src={Logo} alt="logo MakeSense" />
      </div>
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
          {" "}
          Envoyer
        </button>
      </div>
    </div>
  );
}
