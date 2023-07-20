import { React, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/user/Connexion.css";
import "../../assets/logo-makesense.png";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import peoplepicture from "../../assets/peoplepicture.png";
import { useCurrentUserContext } from "../../context/UserContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Connexion() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useCurrentUserContext({});
  const notify = () =>
    toast.error(
      "Vous n'êtes pas inscrit ou vous avez mal renseigné vos identifiants"
    );

  const navigate = useNavigate();

  const sendConnexion = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    /* It's an object that will be sent in the body of request */
    const raw = JSON.stringify({
      email,
      password,
    });

    /* function push user and token in the localstorage */
    fetch(`${backEnd}/login`, {
      method: "POST",
      redirect: "follow",
      body: raw,
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setUser(result.user);
          setToken(result.token);
          localStorage.setItem("token", result.token);
          navigate("/home");
        } else {
          notify();
        }
      })
      .catch((error) => console.warn(error));
  };
  return (
    <div className=" h-auto md-max:bg-dark-blue">
      <Toaster position="top-center" reverseOrder={false} />
      <NavLink to="/">
        <img
          className="p-6 hidden md:block"
          src="/src/assets/logo-makesense.png"
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
      <div className="flex flex-col justify-center items-center text-white md:pt-40 lg:pt-0">
        <div className="w-full bg-dark-blue rounded-lg max-w-md xl:p-0 md:shadow-1 relative ">
          {/* <div className="connexion-YellowRectangle" /> */}
          <div className="p-4 space-y-4 sm:p-8">
            <h1 className="text-flash-yellow text-center font-bold leading-tight tracking-tight text-3xl">
              {t("Connexion page")}
            </h1>
            <p className="text-xl text-center">{t("Accédez à votre compte")}</p>
            <form
              className="index space-y-8"
              action="#"
              onSubmit={(e) => sendConnexion(e)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-white block mt-8 mb-2 text-md font-medium"
                >
                  E-mail :
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  minLength={8}
                  maxLength={200}
                  name="email"
                  id="email"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="pseudo@exemple.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className=" block mb-2 text-md font-medium"
                >
                  {t("Mot de passe")} :
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength={8}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-black border text-sm rounded-lg block w-full p-2.5"
                  required=""
                />
              </div>

              <div className="text-center ">
                <button
                  type="submit"
                  className=" text-white hover:bg-red-pink font-medium rounded-md text-xl p-4 text-center border hover:scale-105 duration-300"
                >
                  {t("Se connecter")}
                </button>

                <p className="text-center mt-3 text-sm">
                  <NavLink to="/motdepasseoublie">
                    <p className="text-white mtmb-1 font-medium hover:underline hover:text-flash-yellow">
                      {t("Mot de passe oublié ?")}
                    </p>
                  </NavLink>
                  <NavLink to="/inscription">
                    <p className=" text-white font-medium text-primary-600 hover:underline hover:text-primary-yellow">
                      {t("S'inscrire")}
                    </p>
                  </NavLink>
                </p>
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
            className="1101-max:hidden w-[350px]"
          />
        </div>
        <div className="flex justify-center mx-20">
          <div className="flex flex-row w-[300px] text-center  text-red-pink text-l justify-around">
            <NavLink className="hover:underline" to="/help">
              <p href="help" className="text-sm">
                {" "}
                {t("Besoin d'aides ?")}
              </p>
            </NavLink>
            <p>-</p>
            <NavLink to="/legal-notice" className="hover:underline">
              <p className="text-sm">{t("Mentions légales")}</p>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Connexion;
