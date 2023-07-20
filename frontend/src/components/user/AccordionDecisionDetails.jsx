import ReactQuill from "react-quill";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import chevronup from "../../assets/icons/chevron-up.svg";
import chevrondown from "../../assets/icons/chevron-down.svg";
import "../../css/user/Accordion.css";
import AccordionCommentsPart from "./AccordionCommentsPart";

export default function AccordionDecisionDetails({
  clickedAnswer4,
  setClickedAnswer4,
  valuesDetailsDecision,
  urlAvatarStatus,
  toggleUpdateDecision,
}) {
  const [clickedAnswer1, setClickedAnswer1] = useState(true);
  const [clickedAnswer2, setClickedAnswer2] = useState(false);
  const [clickedAnswer3, setClickedAnswer3] = useState(false);
  const { t } = useTranslation();

  const handleToggle1 = () => {
    setClickedAnswer1((prev) => !prev);
  };
  const handleToggle2 = () => {
    setClickedAnswer2((prev) => !prev);
  };
  const handleToggle3 = () => {
    setClickedAnswer3((prev) => !prev);
  };
  const handleToggle4 = () => {
    setClickedAnswer4((prev) => !prev);
  };

  return (
    <div className="">
      <ul className="accordion md:max-w-screen-md mt-10 mx-2 h-auto w-screen">
        <li className={`accordion_item mx-2 ${clickedAnswer1 ? "active" : ""}`}>
          <div className="border-b-2 border-red-pink py-4">
            <button
              type="button"
              className="button flex flex-row "
              onClick={handleToggle1}
            >
              <span className="control">
                {clickedAnswer1 ? (
                  <img src={chevronup} alt="" />
                ) : (
                  <img src={chevrondown} alt="" />
                )}
              </span>
              <h2>{t("Détails de la décision")}</h2>
            </button>
          </div>

          {/* The following ternary allows to show the details when the item is active */}
          <div
            className="answer_wrapper"
            style={clickedAnswer1 ? { height: "auto" } : { height: "0px" }}
          >
            <div className="my-6">
              <ReactQuill
                theme="bubble"
                value={valuesDetailsDecision.content}
                readOnly
              />
            </div>
          </div>
        </li>

        <li className={`accordion_item mx-2 ${clickedAnswer2 ? "active" : ""}`}>
          <div className="border-b-2 border-red-pink py-4">
            <button
              type="button"
              className="button flex flex-row "
              onClick={handleToggle2}
            >
              <span className="control">
                {clickedAnswer2 ? (
                  <img src={chevronup} alt="" />
                ) : (
                  <img src={chevrondown} alt="" />
                )}
              </span>
              <h2>{t("Risque potentiel & impact")}</h2>
            </button>
          </div>

          {/* The following ternary allows to show the details when the item is active */}
          <div
            className="answer_wrapper "
            style={clickedAnswer2 ? { height: "auto" } : { height: "0px" }}
          >
            <div className="answer my-6">
              <h3 className="ml-2">{t("Risque potentiel")} :</h3>
              <ReactQuill
                theme="bubble"
                value={valuesDetailsDecision.risk}
                readOnly
              />
              <hr className="border-red-pink my-6" />
              <h3 className="ml-2">{t("Impact details")} :</h3>
              <ReactQuill
                theme="bubble"
                value={valuesDetailsDecision.impact}
                readOnly
              />
            </div>
          </div>
        </li>

        <li className={`accordion_item mx-2 ${clickedAnswer3 ? "active" : ""}`}>
          <div className="border-b-2 border-red-pink py-4">
            <button
              type="button"
              className="button flex flex-row "
              onClick={handleToggle3}
            >
              <span className="control">
                {clickedAnswer3 ? (
                  <img src={chevronup} alt="" />
                ) : (
                  <img src={chevrondown} alt="" />
                )}
              </span>
              <h2>{t("Bénéfices details")}</h2>
            </button>
          </div>

          {/* The following ternary allows to show the details when the item is active */}
          <div
            className="answer_wrapper "
            style={clickedAnswer3 ? { height: "auto" } : { height: "0px" }}
          >
            <div className="answer my-6">
              <ReactQuill
                theme="bubble"
                value={valuesDetailsDecision.benefits}
                readOnly
              />
            </div>
          </div>
        </li>

        <li className={`accordion_item mx-2 ${clickedAnswer4 ? "active" : ""}`}>
          <div className="border-b-2 border-red-pink py-4">
            <button
              type="button"
              className="button flex flex-row "
              onClick={handleToggle4}
            >
              <span className="control">
                {clickedAnswer4 ? (
                  <img src={chevronup} alt="" />
                ) : (
                  <img src={chevrondown} alt="" />
                )}
              </span>
              <h2>{t("Commentaires details")}</h2>
            </button>
          </div>

          {/* The following ternary allows to show the details when the item is active */}
          <div
            className="answer_wrapper "
            style={clickedAnswer4 ? { height: "auto" } : { height: "0px" }}
          >
            <AccordionCommentsPart
              urlAvatarStatus={urlAvatarStatus}
              toggleUpdateDecision={toggleUpdateDecision}
              valuesDetailsDecision={valuesDetailsDecision}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
