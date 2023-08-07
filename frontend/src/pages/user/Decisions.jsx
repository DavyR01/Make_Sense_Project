import { React, useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Paginate from "../../components/user/Paginate";
import TimeStepperHome from "../../components/user/TimeStepperHome";
import DecisionCard from "../../components/user/DecisionCard";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import ChevronDown from "../../assets/icons/chevron-down.svg";
import { useCurrentUserContext } from "../../context/UserContext";
import { useCurrentDarkContext } from "../../context/DarkContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function Decisions({ open }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, token } = useCurrentUserContext();
  const { dark } = useCurrentDarkContext();
  const [valuesDetailsDecisions, setValuesDetailsDecisions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDecisions, setTotalDecisions] = useState();

  // decision per page fix for now
  const decisionPerPage = 12;

  // to show or not the chevron-down icon with filter
  const [isOpenAllDecisions, setIsOpenAllDecisions] = useState(true);
  const [isOpenInProgress, setIsOpenInProgress] = useState(false);
  const [isOpenConflicts, setIsOpenConflicts] = useState(false);
  const [isOpenFinished, setIsOpenFinished] = useState(false);
  const [isOpenUnfinished, setIsOpenUnfinished] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState("all");

  // Get current page depending of paginate component
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    paginate(currentPage);
  }, [filterByStatus]);

  // Get previous page depending of paginate component
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get next page depending of paginate component
  const nextPage = () => {
    if (currentPage !== Math.ceil(totalDecisions / decisionPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function to set the filter by status
  useEffect(() => {
    if (isOpenAllDecisions) {
      setFilterByStatus("all");
    } else if (isOpenInProgress) {
      setFilterByStatus("En cours");
    } else if (isOpenConflicts) {
      setFilterByStatus("En conflit");
    } else if (isOpenFinished) {
      setFilterByStatus("Terminee");
    } else if (isOpenUnfinished) {
      setFilterByStatus("Non aboutie");
    }
  }, [
    isOpenAllDecisions,
    isOpenInProgress,
    isOpenConflicts,
    isOpenFinished,
    isOpenUnfinished,
  ]);

  // function to update the array of decisions after delete one decision
  const updateArrayDecisionsAfterDelete = (id) => {
    const indexOfValueDecision = valuesDetailsDecisions.findIndex(
      (obj) => obj.id === id
    );
    const updatedDecisions = [...valuesDetailsDecisions];
    updatedDecisions.splice(indexOfValueDecision, 1);
    setValuesDetailsDecisions(updatedDecisions);
  };

  // fetch all datas with LEFT JOIN on user_id of decisions from API
  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(
      `${backEnd}/decision/page?&decisionPerPageUs=${decisionPerPage}&currentPageUs=${currentPage}&statusUs=${filterByStatus}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.warn("result : ", result);
        console.warn("valuesDetailsDecisions :", valuesDetailsDecisions); // pareil que         console.warn(result.rows);
        console.warn("totalDecisions :", totalDecisions);

        setValuesDetailsDecisions(result.rows);
        setTotalDecisions(result.nbDecision.nbDecision);
      })
      .catch((error) => console.warn("error", error));
  }, [token, currentPage, filterByStatus, decisionPerPage]);

  const handleChevrondownAllDecisions = () => {
    setIsOpenAllDecisions(!isOpenAllDecisions);
    setIsOpenInProgress(false);
    setIsOpenConflicts(false);
    setIsOpenFinished(false);
    setIsOpenUnfinished(false);
    setCurrentPage(1);
  };

  const handleChevrondownInProgress = () => {
    setIsOpenInProgress(!isOpenInProgress);
    setIsOpenAllDecisions(false);
    setIsOpenConflicts(false);
    setIsOpenFinished(false);
    setIsOpenUnfinished(false);
    setCurrentPage(1);
  };

  const handleChevrondownConflicts = () => {
    setIsOpenConflicts(!isOpenConflicts);
    setIsOpenInProgress(false);
    setIsOpenAllDecisions(false);
    setIsOpenFinished(false);
    setIsOpenUnfinished(false);
    setCurrentPage(1);
  };

  const handleChevrondownFinished = () => {
    setIsOpenFinished(!isOpenFinished);
    setIsOpenAllDecisions(false);
    setIsOpenInProgress(false);
    setIsOpenConflicts(false);
    setIsOpenUnfinished(false);
    setCurrentPage(1);
  };

  const handleChevrondownUnfinished = () => {
    setIsOpenUnfinished(!isOpenUnfinished);
    setIsOpenAllDecisions(false);
    setIsOpenInProgress(false);
    setIsOpenConflicts(false);
    setIsOpenFinished(false);
    setCurrentPage(1);
  };

  return (
    <div
      className={`w-screen overflow-hidden flex flex-col ${
        dark ? "" : "bg-dark-header"
      }`}
    >
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
            <p className=" pt-3 text-xl">
              {t("Bonjour home")} {user.firstname}
            </p>
          ) : (
            <p className=" pt-3 text-xl">{t("Bonjour home")}</p>
          )}
          <p className=" text-x font-extralight text-gray-500 pb-2">
            {t("Nous sommes le")} : {new Date().toLocaleDateString()}
          </p>
        </div>
        <h1 className="hidden md:flex text-2xl text-red-pink">
          {t("Décisions page")}
        </h1>
        <div className="logo-home hidden md:flex ">
          {dark ? (
            <img src={Logo} alt="logo make-sense" />
          ) : (
            <img src={LogoWhite} alt="logo make-sense" />
          )}
        </div>
      </div>
      <div className="lg:flex hidden">
        <div className="md:flex">
          <button
            type="button"
            onClick={handleChevrondownAllDecisions}
            className={`ml-10 flex items-center mt-5 h-10 pl-2 pr-2 border-2 rounded-xl  ${
              dark
                ? "border-black text-black"
                : " border-gray-bar text-gray-bar"
            }`}
          >
            {isOpenAllDecisions ? (
              <img src={ChevronDown} alt="fleche vers le bas" />
            ) : null}
            {t("Toutes les décisions")}
          </button>
        </div>
        <button
          type="button"
          onClick={handleChevrondownInProgress}
          className="ml-10 flex items-center mt-5 h-10 pl-2 pr-2 border-2 border-light-blue text-light-blue rounded-xl"
        >
          {isOpenInProgress ? (
            <img src={ChevronDown} alt="fleche vers le bas" />
          ) : null}
          {t("En cours")}
        </button>
        <button
          type="button"
          onClick={handleChevrondownConflicts}
          className="ml-10 flex items-center mt-5 h-10 pl-2 pr-2 border-2 border-light-orange text-light-orange rounded-xl"
        >
          {isOpenConflicts ? (
            <img src={ChevronDown} alt="fleche vers le bas" />
          ) : null}
          {t("Conflits filter")}
        </button>
        <button
          type="button"
          onClick={handleChevrondownFinished}
          className="ml-10 flex items-center mt-5 h-10 pl-2 pr-2 border-2 border-light-green text-light-green rounded-xl"
        >
          {isOpenFinished ? (
            <img src={ChevronDown} alt="fleche vers le bas" />
          ) : null}
          {t("Terminées filter")}
        </button>
        <button
          type="button"
          onClick={handleChevrondownUnfinished}
          className="ml-10 flex items-center mt-5 h-10 pl-2 pr-2 border-2 border-red-pink text-red-pink rounded-xl"
        >
          {isOpenUnfinished ? (
            <img src={ChevronDown} alt="fleche vers le bas" />
          ) : null}
          {t("Non_abouties")}
        </button>
        <button
          onClick={() => navigate("/create-decision")}
          type="button"
          className="ml-10 pl-2 pr-2 mt-5 mb-5 h-10 bg-red-pink rounded-xl text-white hover:bg-white hover:text-red-pink hover:border-2 hover:border-red-pink"
        >
          + {t("Créer une décision")}
        </button>
      </div>
      <Menu
        as="div"
        className="relative flex justify-center md:items-start items-center text-left mt-3 lg:hidden md:ml-10 flex-col"
      >
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => navigate("/create-decision")}
            className="inline-flex w-[100px] mr-9 justify-center rounded-xl  bg-red-pink px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            + {t("Créer une décision")}
          </button>
          <Menu.Button className="inline-flex w-[100px] justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            {t("Filtrer btn")}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={handleChevrondownAllDecisions}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Toutes les décisions
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={handleChevrondownInProgress}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      En cours
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={handleChevrondownConflicts}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Conflits
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={handleChevrondownFinished}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Terminées
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={handleChevrondownUnfinished}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Non abouties
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
      <div className="flex flex-col items-center md:grid md:grid-cols-3 lg:grid-cols-4 md:items-start mt-3 ">
        <div className="md:grid col-start-1 md:col-end-3 lg:col-end-4 md:ml-10 md:justify-start">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-4">
            {valuesDetailsDecisions.map((valueDetailsDecision) => {
              return (
                <DecisionCard
                  key={valueDetailsDecision.id}
                  valueDetailsDecision={valueDetailsDecision}
                  updateArrayDecisionsAfterDelete={
                    updateArrayDecisionsAfterDelete
                  }
                />
              );
            })}
          </div>

          <div className="md:ml-6 mb-16 mt-6">
            <Paginate
              decisionPerPage={decisionPerPage}
              totalDecisions={totalDecisions}
              currentPage={currentPage}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
              open={open}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <TimeStepperHome />
        </div>
      </div>
    </div>
  );
}
