import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../css/user/ForgottenPassword.css";
import peoplepicture from "../../assets/peoplepicture.png";
import "../../assets/logo-makesense.png";
import HeaderCountryChoice from "../../components/user/HeaderCountryChoice";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Password() {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const { passwordToken } = useParams();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    password,
    passwordToken,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const sendPassword = (e) => {
    e.preventDefault();
    fetch(`${backEnd}/resetpassword`, requestOptions)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className="inscriptionPage bg-white relative h-screen w-screen overflow-x-hidden">
      <HeaderCountryChoice />
      <NavLink to="/">
        <img
          className="p-6"
          src="/src/assets/logo-makesense.png"
          alt="logo"
          width={350}
        />
      </NavLink>
      <div className=" inscriptionBloc flex flex-col justify-center items-center text-white ">
        <div className="bg-dark-blue  rounded-lg max-w-xl xl:p-0 shadow-1 mt-[144px] relative ">
          {/* <div className="connexion-YellowRectangle" /> */}
          <div className="p-6 space-y-6 sm:p-12">
            <h1 className="text-flash-yellow text-center font-bold leading-tight tracking-tight text-3xl">
              Ajoutez votre nouveau mot de passe.
            </h1>
            <form className=" index space-y-8" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="text-white block mt-8 mb-4 text-lg font-medium"
                >
                  Nouveau mot de passe :
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required=""
                />
              </div>
              <div className="text-center ">
                <button
                  type="submit"
                  onClick={sendPassword}
                  className=" text-white hover:bg-red-pink font-medium rounded-lg text-1xl px-5 py-3 text-center border hover:scale-105 duration-300"
                >
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>
        </div>
        <br />
      </div>
      {/* <section className="xxl-max:hidden"> */}
      <section className="">
        <div className="auth-LeftPicture absolute top-[240px] left-0">
          <img
            src={peoplepicture}
            alt="PicturePrésentation"
            width={520}
            className="1101-max:hidden 1590-max:w-2/6 w-3/7"
          />
        </div>
        <div className="auth-rightBottomBloc relative">
          <div className="auth-textOvale absolute right-[200px] bottom-[-15px] z-10 text-red-pink text-xl xl-max:hidden">
            <NavLink className="hover:underline" to="/help">
              <p href="help"> Besoin d'aides ?</p>
            </NavLink>
            <NavLink to="/legal-notice">
              <p className="mt-4 hover:underline">Mentions légales</p>
            </NavLink>
          </div>
          <div className="xxl-max:hidden">
            <div className="auth-Ovale">
              <div className="auth-OvaleRed bg-red-pink rounded-full rotate-[180deg] absolute w-[208px] h-[96px] right-[70px] bottom-[125px]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Password;
