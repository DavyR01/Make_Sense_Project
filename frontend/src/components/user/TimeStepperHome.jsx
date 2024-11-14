import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import circle from "../../assets/icons/circle.svg";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import "../../css/user/homeUser.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function TimeStepperHome() {
  const { t } = useTranslation();
  const { token } = useCurrentUserContext();
  const { dark } = useCurrentDarkContext();
  const [decisions, setDecisions] = useState([]);
  // const dateFormat = (date) => {
  //   return date.slice(0, 10);
  // };
  const dateFormat = (date) => {
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2].split("T")[0];

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      post: "GET",
      headers: myHeader,
    };

    fetch(`${backEnd}/decision/last`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDecisions(result))
      .catch((error) => console.warn("error", error));
  }, [token]);

  return (
    <div className="flex flex-col pb-5 pt-5 rounded-xl w-[200px]">
      <h6 className={`text-center mb-5 ${dark ? "text-black" : "text-white"}`}>
        {t("Prochaines décisions")}
      </h6>
      <ul className="flex flex-col ">
        {decisions?.map((data, index) => (
          <li key={index} className="grid grid-cols-4">
            <div className="mx-2 flex flex-col items-center col-span-1">
              <div>
                <img
                  src={circle}
                  alt=""
                  className="h-2 w-2" /* z-index="12" */
                />
              </div>
              <div>
                <div className="w-0.5 h-16 bg-red-pink" />
              </div>

              <div className="" />
            </div>
            <div className="flex flex-col col-span-3">
              <div className="text-sm text-gray-500 text-left ">
                {dateFormat(data.date_decision_final)}
              </div>
              <p
                className={`text-sm   ${
                  dark ? "text-dark-blue" : "text-gray-500"
                }`}
              >
                {data.title}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
