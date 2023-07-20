import React from "react";
import "../css/user/Authentification.css";
import Connexion from "./user/Connexion";
import HeaderCountryChoice from "../components/user/HeaderCountryChoice";
// import ForgottenPassword from "../components/user/ForgottenPassword";

export default function Authentification() {
  return (
    <section className="bg-dark-blue md:bg-white relative h-screen w-auto xl:overflow-hidden">
      <HeaderCountryChoice />
      <Connexion />
    </section>
  );
}
