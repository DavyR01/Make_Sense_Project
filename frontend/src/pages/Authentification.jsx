import React from "react";
import HeaderCountryChoice from "../components/user/HeaderCountryChoice";
import Connexion from "./user/Connexion";
// import ForgottenPassword from "../components/user/ForgottenPassword";

export default function Authentification() {
  return (
    <section className="bg-dark-blue md:bg-white relative h-screen w-auto xl:overflow-hidden">
      <HeaderCountryChoice />
      <Connexion />
    </section>
  );
}
