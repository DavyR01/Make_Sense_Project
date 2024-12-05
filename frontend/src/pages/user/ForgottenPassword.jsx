import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import logoMakeSense from "../../assets/logo-makesense.png";
import peoplepicture from "../../assets/peoplepicture.png";
import HeaderCountryChoice from "../../components/user/HeaderCountryChoice";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function ForgottenPassword({ email, setEmail }) {
  const myHeaders = new Headers();
  const { t } = useTranslation();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    email,
  });
  const [message, setMessage] = React.useState("");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const sendEmail = async () => {
    try {
      const result = await fetch(
        `${backEnd}/forgottenpassword`,
        requestOptions
      );

      if (!result.ok) {
        throw new Error(
          `HTTP error! status: ${result.status} - ${result.statusText}`
        );
      }
      setMessage("service OFF"); // Message de succès

      // console.log(result.statusText, "but sendinblue is off for the moment !");
    } catch (error) {
      // console.log("error during send email :", error);
      setMessage("Failed to send email. Please try again."); // Message d'erreur
    }
  };

  return (
    <div className=" bg-dark-blue md:bg-white  relative h-screen w-screen overflow-x-hidden">
      <HeaderCountryChoice />
      <NavLink to="/">
        <img
          className="p-6 hidden md:block"
          src={logoMakeSense}
          alt="logo"
          width={350}
        />
      </NavLink>
      <NavLink to="/" className="flex justify-center">
        <img
          className="p-6 md:hidden"
          src="/src/assets/make_sense_white.png"
          alt="logo"
          width={350}
        />
      </NavLink>
      <div className="flex flex-col justify-between md-max:h-3/4 md:pt-40 lg:pt-0">
        <div className=" flex flex-col justify-center items-center text-white ">
          <div className="bg-dark-blue  rounded-lg max-w-xl xl:p-0 md:shadow-1 mt-[30px] md:mt-[60px] ">
            {/* <div className="connexion-YellowRectangle" /> */}
            <div className="p-6 space-y-6 sm:p-12 sm:px-24">
              <h1 className="text-flash-yellow text-center font-bold leading-tight tracking-tight text-3xl">
                {t("Mot de passe oublié ?")}
              </h1>
              <form className=" index space-y-8" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="text-white block mt-8 mb-4 text-md font-medium"
                  >
                    {t("Votre adresse mail")}
                    <span className="text-flash-yellow">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="pseudo@exemple.com"
                    required=""
                  />
                </div>
                <div className="text-center ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      sendEmail();
                    }}
                    type="submit"
                    className=" text-white mt-5 hover:bg-red-pink font-medium rounded-lg text-xl px-5 py-3 text-center border hover:scale-105 duration-300"
                  >
                    {t("Envoyer la demande")}
                  </button>
                </div>
                <div className="">
                  <p className="text-center">{/* {t("Reponse mdp")} */}</p>
                  {message && (
                    <p className="text-red-500 text-center">
                      {message === "service OFF" ? t("serviceoff") : ""}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
          <br />
        </div>
        <section
          className="flex flex-col md-max:h-max
       md-max:flex-end"
        >
          <div className="auth-LeftPicture absolute top-[240px] left-0">
            <img
              src={peoplepicture}
              alt="PicturePrésentation"
              width={520}
              className="xl-max:hidden w-[350px]"
            />
          </div>
          <div className="flex justify-center mx-20">
            <div className="flex flex-row w-[300px] text-center text-red-pink  justify-around">
              <NavLink className="hover:underline " to="/help">
                <p href="help" className="text-sm hover:underline">
                  {" "}
                  {t("Besoin d'aides ?")}
                </p>
              </NavLink>
              <p>-</p>
              <NavLink to="/legal-notice" className="hover:underline ">
                <p className="text-sm ">{t("Mentions légales")}</p>
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ForgottenPassword;
