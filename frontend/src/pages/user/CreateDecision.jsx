import { React, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import toast, { Toaster } from "react-hot-toast";
import target from "../../assets/icons/target.svg";
import "../../css/user/createDecision.css";
import Close from "../../assets/icons/x.svg";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.bubble.css";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function CreateDecision() {
  const { t } = useTranslation();
  const { user, token } = useCurrentUserContext();
  const { dark } = useCurrentDarkContext();
  const [title, setTitleDecision] = useState("");
  const [content, setValueDecision] = useState("");
  const [impact, setValueImpactOfDecision] = useState("");
  const [benefits, setValueBenefitsOfDecision] = useState("");
  const [risk, setValueRiskOfDecision] = useState("");
  const [date_Decision_Conflict, setStartDateConflictOfDecision] = useState(
    new Date()
  );
  const [personImpactedDecision, setPersonImpactedDecision] = useState([]);
  const [personExperteDecision, setPersonExperteDecision] = useState([]);
  const [choosePersonExpert, setChoosePersonExpert] = useState([]);
  const [choosePersonConcern, setChoosePersonConcern] = useState([]);
  const navigate = useNavigate();

  // modules for react-quill text editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "underline", "italic"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const modulesmobile = {
    toolbar: [
      ["bold", "underline", "italic"],
      ["link", "image"],
    ],
  };

  // for alert notification error edit decision after submit
  const notify = () =>
    toast.error(
      "Une erreure est survenue, veuillez vérifier que vous avez bien rempli tous les champs"
    );

  const success = () => {
    toast.success("Votre décision a bien été créée");
  };

  const dateConvertedToSqlFormat = (date) => {
    const dateConverted = new Date(date);
    const year = dateConverted.getFullYear();
    const month = dateConverted.getMonth() + 1;
    const day = dateConverted.getDate();
    const hour = dateConverted.getHours();
    const minutes = dateConverted.getMinutes();
    const seconds = dateConverted.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  };

  // This is for Send Decision
  function sendDecision() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title,
      content,
      impact,
      risk,
      benefits,
      date_decision_creation: dateConvertedToSqlFormat(Date.now()),
      date_decision_conflict: dateConvertedToSqlFormat(date_Decision_Conflict),
      status_decision: "En cours",
      user_id: user.id,
      person_expert: choosePersonExpert,
      person_concern: choosePersonConcern,
      notif: choosePersonConcern,
    });

    fetch(`${backEnd}/decision`, {
      method: "POST",
      redirect: "follow",
      body: raw,
      headers: myHeaders,
    })
      .then((response) => {
        if (response.status === 201) {
          success();
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          notify();
        }
      })
      .catch(() => notify());
  }

  // This is for GET user by name for input autocomplete
  const handleChange = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${backEnd}/user/byname`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPersonExperteDecision(result);
        setPersonImpactedDecision(result);
      })
      .catch((error) => console.warn("error", error));
  };

  const handleDeleteExpert = (index) => {
    const newList = choosePersonExpert.filter((_, i) => i !== index);
    setChoosePersonExpert(newList);
  };

  const handleDeleteConcern = (index) => {
    const newList = choosePersonConcern.filter((_, i) => i !== index);
    setChoosePersonConcern(newList);
  };

  return (
    <div className={`w-screen ${dark ? "" : "bg-dark-header text-white"}`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 1000 }}
      />
      <div
        className={`flex flex-row items-center justify-between bg-light-grey pr-16 pl-10
          ${
            dark
              ? "text-black"
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
        <h1 className="hidden md:flex text-2xl text-red-pink">
          {t("Créer une décision")}
        </h1>
        <div className="hidden md:block logo-home">
          {dark ? (
            <img src={Logo} alt="logo make-sense" />
          ) : (
            <img src={LogoWhite} alt="logo make-sense" />
          )}
        </div>
      </div>
      <main className="mainCreateDecision">
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div className="hidden md:block row-span-3 md:mr-4">
            <p className="mt-20 decision-resume">
              <img src={target} alt="targeticon" />
              {t("Décision title")}
            </p>
            <p className="decision-explaination">
              {t(
                "Veuillez créer une décision en remplissant les champs ci-dessous."
              )}
            </p>
          </div>
          <div className="col-span-2">
            <div className="mt-14 mb-6">
              <label htmlFor="title-input" className="block mb-2">
                {t("Titre de la décision")}{" "}
              </label>
              <input
                onChange={(e) => setTitleDecision(e.target.value)}
                type="text"
                value={title}
                id="title-input"
                className={`border border-gray-300  text-sm rounded-xl block w-full p-2.5 ${
                  dark ? "text-gray-900" : "bg-dark-bg text-white"
                }`}
              />
            </div>
            <div className="hidden md:block">
              <h2 className="mt-8 mb-3">{t("Description de la décision")} :</h2>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setValueDecision}
                modules={modules}
                preserveWhitespace
              />
            </div>

            <div className="hidden md:block">
              <h2 className="mt-8 mb-3">{t("Impact sur l'organisation")} :</h2>
              <ReactQuill
                theme="snow"
                value={impact}
                onChange={setValueImpactOfDecision}
                modules={modules}
                preserveWhitespace
              />
            </div>

            <div className="hidden md:block">
              <h2 className="mt-8 mb-3">{t("Bénéfice de la décision")} :</h2>
              <ReactQuill
                theme="snow"
                value={benefits}
                onChange={setValueBenefitsOfDecision}
                modules={modules}
                preserveWhitespace
              />
            </div>

            <div className="hidden md:hidden">
              <h2 className="mt-8 mb-3">
                {t("Risques potentiels de la décision")} :
              </h2>
              <ReactQuill
                theme="snow"
                value={risk}
                onChange={setValueRiskOfDecision}
                modules={modules}
                preserveWhitespace
              />
            </div>

            <div className="md:hidden">
              <h2 className="mt-8 mb-3">{t("Description de la décision")} :</h2>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setValueDecision}
                modules={modulesmobile}
                preserveWhitespace
              />
            </div>

            <div className="md:hidden">
              <h2 className="mt-8 mb-3">{t("Impact sur l'organisation")} :</h2>
              <ReactQuill
                theme="snow"
                value={impact}
                onChange={setValueImpactOfDecision}
                modules={modulesmobile}
                preserveWhitespace
              />
            </div>

            <div className="md:hidden">
              <h2 className="mt-8 mb-3">{t("Bénéfice de la décision")} :</h2>
              <ReactQuill
                theme="snow"
                value={benefits}
                onChange={setValueBenefitsOfDecision}
                modules={modulesmobile}
                preserveWhitespace
              />
            </div>

            <div className="md:hidden">
              <h2 className="mt-8 mb-3">
                {t("Risques potentiels de la décision")} :
              </h2>
              <ReactQuill
                theme="snow"
                value={risk}
                onChange={setValueRiskOfDecision}
                modules={modulesmobile}
                preserveWhitespace
              />
            </div>

            <h2 className="mt-8 mb-3">{t("Date finale de la décision")} :</h2>
            <div className="flex items-center max-xl:flex-col xl:justify-between max-xl:gap-y-8 xl p-2 ">
              <div className=" z-20">
                <DatePicker
                  selected={date_Decision_Conflict}
                  onChange={(date) => setStartDateConflictOfDecision(date)}
                  disabledKeyboardNavigation
                  placeholderText="Donner son avis"
                  className={`border border-gray-300  text-sm rounded-xl block w-[200px] p-2.5 ${
                    dark ? "text-black " : "text-white bg-dark-header"
                  }`}
                />
              </div>
            </div>
            <div className="mt-8">
              <label htmlFor="pconcern-input" className="block mb-2">
                {t("Personnes impactées")}{" "}
              </label>
              <ReactSearchAutocomplete
                items={personImpactedDecision}
                onFocus={handleChange}
                onSelect={(newChoosePersonConcern) =>
                  setChoosePersonConcern((person) => [
                    ...person,
                    newChoosePersonConcern,
                  ])
                }
                styling={{ zIndex: 3 }}
                maxResults={3}
              />
              {/* this is for display expert person */}
              <ul className="m-3">
                {choosePersonConcern?.map((person, index) => (
                  <li key={person.id} className="flex flex-row">
                    {person.name}
                    <button
                      type="button"
                      onClick={() => handleDeleteConcern(index)}
                    >
                      <img src={Close} alt="supprimer" className="w-4 ml-2" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 mb-8 md:mb-4 lg:mb-8">
              <label htmlFor="pexpert-input" className="block mb-2">
                {t("Personnes expertes")}{" "}
              </label>
              <ReactSearchAutocomplete
                items={personExperteDecision}
                onFocus={handleChange}
                onSelect={(newChoosePersonExpert) =>
                  setChoosePersonExpert((person) => [
                    ...person,
                    newChoosePersonExpert,
                  ])
                }
                maxResults={3}
              />
              <ul className="m-3">
                {choosePersonExpert?.map((person, index) => (
                  <li key={person.id} className="flex flex-row">
                    {person.name}
                    <button
                      type="button"
                      onClick={() => handleDeleteExpert(index)}
                    >
                      <img src={Close} alt="supprimer" className="w-4 ml-2" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <div className="mb-24 md:mb-32 lg:mb-5">
        <button
          type="button"
          onClick={sendDecision}
          id="buttonEnvoyerDecision"
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 mr-0 md:float-right md:mr-48 ml-14 md:mb-8 rounded-xl"
        >
          {t("Envoyer btn")}
        </button>
      </div>
    </div>
  );
}
