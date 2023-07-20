import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/user/createDecision.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.bubble.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import Close from "../../assets/icons/x.svg";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function EditDecision() {
  const { t } = useTranslation();
  const { user, token } = useCurrentUserContext();
  const { dark } = useCurrentDarkContext();
  const [title, setTitleDecision] = useState("");
  const [content, setValueDecision] = useState("");
  const [impact, setValueImpactOfDecision] = useState("");
  const [benefits, setValueBenefitsOfDecision] = useState("");
  const [risk, setValueRiskOfDecision] = useState("");
  // const to keep the origin value of the decision
  const [valueDefaultDateOfConflict, setValueDefaultDateOfConflict] =
    useState(null);
  // const to keep the origin value of the decision
  const [valueDefaultStatusOfDecision, setValueDefaultStatusOfDecision] =
    useState("");
  const [dateDecisionConflict, setStartDateConflictOfDecision] = useState(
    new Date()
  );
  const [personImpactedDecision, setPersonImpactedDecision] = useState([]);
  const [personExperteDecision, setPersonExperteDecision] = useState([]);
  const [choosePersonExpert, setChoosePersonExpert] = useState([]);
  const [choosePersonConcern, setChoosePersonConcern] = useState([]);

  const [status_decision, setStatusOfDecision] = useState("");
  const navigate = useNavigate();
  const idParam = useParams();

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

  // for alert notification error edit decision after submit
  const notify = () =>
    toast.error(
      "Une erreure est survenue, veuillez vérifier que vous avez bien rempli tous les champs"
    );

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

  const dateConvertedToDisplayDateFormat = (date) => {
    const dateConverted = new Date(date);
    const year = dateConverted.getFullYear();
    const month = dateConverted.getMonth() + 1;
    const day = dateConverted.getDate();
    return `${day}/${month}/${year}`;
  };

  // fetch data
  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${backEnd}/decision/${idParam.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTitleDecision(result.title);
        setValueDecision(result.content);
        setValueImpactOfDecision(result.impact);
        setValueBenefitsOfDecision(result.benefits);
        setValueRiskOfDecision(result.risk);
        setValueDefaultDateOfConflict(result.date_decision_conflict);
        setStartDateConflictOfDecision(new Date(result.date_decision_conflict));
        setValueDefaultStatusOfDecision(result.status_decision);
        setStatusOfDecision(result.status_decision);
        setChoosePersonExpert(
          result.concerns.map((concern) => {
            return {
              user_id: concern.user_id,
              name: `${concern.firstname} ${concern.lastname}`,
            };
          })
        );
        setChoosePersonConcern(
          result.experts.map((expert) => {
            return {
              user_id: `${expert.user_id}`,
              name: `${expert.firstname} ${expert.lastname}`,
            };
          })
        );
      })
      .catch((error) => console.warn("error", error));
  }, []);

  function sendEditDecision() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title,
      content,
      impact,
      risk,
      benefits,
      status_decision,
      date_decision_conflict: dateConvertedToSqlFormat(dateDecisionConflict),
      user_id: user.id,
      person_expert: choosePersonExpert,
      person_concern: choosePersonConcern,
    });
    toast
      .promise(
        fetch(`${backEnd}/decision/${idParam.id}`, {
          method: "PUT",
          redirect: "follow",
          body: raw,
          headers: myHeaders,
        }),
        {
          loading: "Envoi en cours",
          success: "La décision a bien été modifiée",
          error: "Une erreur sur le serveur est survenue lors de l'envoi",
        }
      )
      .then((response) => {
        response.json();

        if (response.status === 201) {
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          notify();
        }
      })
      .catch((error) => console.warn("error", error));
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
          {t("Modifier ma décision")}
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
        <div className="col-span-2 ...">
          <div className="mt-14 mb-6">
            <label htmlFor="title-input" className="block mb-2">
              {t("Titre de la décision")} :
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
          <h2 className="mt-8 mb-3">{t("Description de la décision")} :</h2>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setValueDecision}
            modules={modules}
          />
          <h2 className="mt-8 mb-3">{t("Impact sur l'organisation")} :</h2>
          <ReactQuill
            theme="snow"
            value={impact}
            onChange={setValueImpactOfDecision}
            modules={modules}
          />
          <h2 className="mt-8 mb-3">{t("Bénéfice de la décision")} :</h2>
          <ReactQuill
            theme="snow"
            value={benefits}
            onChange={setValueBenefitsOfDecision}
            modules={modules}
          />
          <h2 className="mt-8 mb-3">{t("Risque potentiel")} :</h2>
          <ReactQuill
            theme="snow"
            value={risk}
            onChange={setValueRiskOfDecision}
            modules={modules}
          />
          <h2 className="mt-8 mb-3">
            {`Deadline pour rentrer en conflit (Actuel : ${dateConvertedToDisplayDateFormat(
              valueDefaultDateOfConflict
            )})
            :`}
          </h2>
          <div className="flex items-center max-xl:flex-col xl:justify-between max-xl:gap-y-8">
            <div className="z-20">
              <DatePicker
                selected={dateDecisionConflict}
                onChange={(date) => setStartDateConflictOfDecision(date)}
                disabledKeyboardNavigation
                placeholderText="Cliquer pour changer de date"
                className={`border border-gray-300  text-sm rounded-xl block w-[200px] p-2.5 ${
                  dark ? "text-black " : "text-white bg-dark-header"
                }`}
              />
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="status-input" className="block mb-2">
              {t("Statut de la décision")} ({t("Actuel statut")} :{" "}
              {valueDefaultStatusOfDecision}) :
            </label>
            <select
              onChange={(e) => setStatusOfDecision(e.target.value)}
              id="status-input"
              className={`border border-gray-300 text-sm rounded-xl block w-80 p-2.5   ${
                dark ? "bg-white text-black" : " bg-dark-header"
              }`}
            >
              <option defaultValue="OptionStatus" disabled selected>
                {t("Cliquer pour changer de statut")}
              </option>
              <option value="En cours">{t("En cours")}</option>
              <option value="En conflit">{t("Conflits filter")}</option>
              <option value="Terminee">{t("Terminées filter")}</option>
              <option value="Non aboutie">{t("Non abouties")}</option>
            </select>
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
              maxResults={15}
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
          <div className="mt-8 mb-8">
            <label htmlFor="pexpert-input" className="block mb-2 ">
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
              maxResults={15}
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
      </main>
      <div className="mb-24 md:mb-5">
        <button
          type="button"
          onClick={sendEditDecision}
          id="buttonEnvoyerDecision"
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 mr-0 md:float-right md:mr-48 ml-14 md:mb-8 rounded-xl"
        >
          {t("Envoyer btn")}
        </button>
      </div>
    </div>
  );
}
