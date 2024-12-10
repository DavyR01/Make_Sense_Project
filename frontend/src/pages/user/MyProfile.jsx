import { React, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import "../../css/user/myprofile.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function MyProfile() {
  const { user, setUser, token } = useCurrentUserContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const avatarRef = useRef(null);
  const { dark } = useCurrentDarkContext();
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [city, setCity] = useState(user.city);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [urlAvatarStatus, setAvatarStatus] = useState("");
  const notifySuccesAvatar = () =>
    toast.success("Votre photo a bien été envoyée !");
  const notifyErrorAvatar = () =>
    toast.error("Une erreur est survenue, veuillez recommencer");
  const notifyErrorProfile = () =>
    toast.error("Une erreur est survenue, veuillez vérifier vos informations");
  const success = () => {
    toast.success("Votre profil a bien été modifié !");
  };

  // fetch user informations
  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${backEnd}/user/bytoken`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFirstname(result.firstname);
        setLastname(result.lastname);
        setEmail(result.email);
        setCity(result.city);
        setPhone(result.phone);
      })
      .catch((error) => console.warn("error", error));
  }, []);

  // fetch to submit my avatar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatarRef.current.files[0]) {
      // recupération des articles.
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("avatar", avatarRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body: formData,
      };

      fetch(`${backEnd}/avatar`, requestOptions)
        .then((response) => response.json())
        .then((results) => {
          setUser({ ...user, avatar: results.avatar });
          notifySuccesAvatar();
        })
        .catch((error) => {
          notifyErrorAvatar();
          console.error(error);
        });
    } else {
      notifyErrorAvatar();
    }
  };

  // fetch to edit my profile informations
  function sendUserInformations() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstname,
      lastname,
      email,
      city,
      phone,
      user_id: user.id,
    });

    fetch(`${backEnd}/user/${user.id}`, {
      method: "PUT",
      redirect: "follow",
      body: raw,
      headers: myHeaders,
    })
      .then((response) => {
        if (response.status === 422) {
          throw new Error("Error on profile update");
        } else {
          return response.json();
        }
      })
      .then((results) => {
        setUser({
          ...user,
          firstname: results.firstname,
          lastname: results.lastname,
          email: results.email,
          city: results.city,
          phone: results.phone,
        });
        success();
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch(() => notifyErrorProfile());
  }

  // fetch for the status of fetch of the avatar
  useEffect(() => {
    fetch(`${backEnd}/avatar/${user.avatar}`)
      .then((response) => setAvatarStatus(response))
      .catch((error) => console.warn(error));
  }, [user]);

  return (
    <div className={`w-screen ${dark ? "" : "bg-dark-header text-white"}`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 1000 }}
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
        <h1 className="text-2xl md:flex hidden text-red-pink">
          {t("Mon profil")}
        </h1>
        <div className="logo-home hidden md:flex ">
          {dark ? (
            <img src={Logo} alt="logo make-sense" />
          ) : (
            <img src={LogoWhite} alt="logo make-sense" />
          )}
        </div>
      </div>

      <div className="overflow-x-hidden myProfilContent md-max:flex flex-wrap flex-col items-center">
        <div className="myProfilImage md:w-5/6 ml-5 md:m-auto flex md:flex-row md-max:flex-col md-max:m-auto md:items-end">
          <div className="circle_add mt-10 flex md-max:m-auto md-max:mt-10">
            {urlAvatarStatus.status === 200 ? (
              <img
                className="shadow rounded-full w-40 h-36 align-middle border-none hover:opacity-25 transition ease-in-out delay-50 "
                src={`${backEnd}/avatar/${user.avatar}`}
                alt={`avatar${user.firstname}-${user.id}`}
              />
            ) : null}
          </div>
          <div className="flex flex-col px-4">
            <p className=" mt-6 mb-3 md:mt-[125px] md:ml-5">
              {t("Ajoute une photo")}
            </p>
            <form
              className="flex flex-col items-start md:ml-5 w-max"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <input type="file" ref={avatarRef} />
              <button
                className=" bg-light-blue hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl mt-4"
                type="submit"
              >
                {t("Charger photo")}
              </button>
            </form>
          </div>
        </div>

        <div className="myProfilForm w-4/5">
          <form className="flex flex-col m-auto pt-8 items-start md:items-center justify-center w-full">
            <div className="md:grid md:w-2/3 overflow-hidden md:grid-cols-2 md:grid-rows-4 md:gap-3 md:pt-5 w-full">
              <div className="md:box md:col-start-1 md:col-end-2 ">
                <label className="flex flex-col text font-light">
                  {t("Prénom input")} :
                  <input
                    className="mt-3 md:w-[200px] mb-5 md:mb-0 border-2 rounded-xl text-black border-gray-300 h-10 px-2"
                    type="text"
                    name="name"
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder={user.firstname}
                  />
                </label>
              </div>
              <div className="box col-start-2 col-end-3">
                <label className="flex flex-col text font-light">
                  {t("Nom input")} :
                  <input
                    className="mt-3 mb-5 md:mb-0 md:w-[200px] border-2 rounded-xl text-black border-gray-300 h-10 px-2"
                    type="text"
                    name="name"
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder={user.lastname}
                  />
                </label>
              </div>
              <div className="box col-start-1 col-end-2">
                <label className="flex flex-col text font-light">
                  {t("Localisation input")} :
                  <input
                    className="mt-3 md:w-[200px] mb-5 md:mb-0 border-2 rounded-xl text-black border-gray-300 h-10 px-2"
                    type="text"
                    name="name"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={user.city}
                  />
                </label>
              </div>
              <div className="box col-start-2 col-end-3">
                <label className="flex flex-col text font-light">
                  Email :
                  <input
                    className="mt-3 md:w-[200px] border-2 mb-5 md:mb-0 rounded-xl text-black border-gray-300 h-10 px-2"
                    type="text"
                    name="name"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={user.email}
                  />
                </label>
              </div>
              <div className="box col-start-1 col-end-2">
                <label className="flex flex-col text font-light">
                  {t("Téléphone input")} :
                  <input
                    className="mt-3 md:w-[200px] border-2 rounded-xl text-black border-gray-300 h-10 px-2"
                    type="text"
                    name="name"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={user.phone}
                  />
                </label>
              </div>
              <div className="box pt-[32px] col-start-2 col-end-3">
                <div className="flex mb-10 md:pl-[56px]">
                  <button
                    type="button"
                    onClick={sendUserInformations}
                    id="buttonEnvoyerDecision"
                    className="flex mb-8 bg-red-pink hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl w-full h-12 justify-center items-center"
                  >
                    {t("Envoyer btn")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
