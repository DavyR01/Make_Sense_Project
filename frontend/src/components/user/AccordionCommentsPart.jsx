import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCurrentUserContext } from "../../context/UserContext";
import Comment from "./Comment";

function AccordionCommentsPart({
  toggleUpdateDecision,
  urlAvatarStatus,
  valuesDetailsDecision,
}) {
  const [valueNewComment, setValueNewComment] = useState("");
  const [newValueStatus, setNewValueStatus] = useState("");
  const [chosenStatusNeutral, setChosenStatusNeutral] = useState(false);
  const [chosenStatusFor, setChosenStatusFor] = useState(false);
  const [chosenStatusAgainst, setChosenStatusAgainst] = useState(false);

  const { user, token } = useCurrentUserContext();
  const idParam = useParams();
  const backEnd = import.meta.env.VITE_BACKEND_URL;

  const modules = {
    toolbar: [
      ["bold", "underline", "italic"],
      ["link", "image"],
    ],
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

  const handleStatus = (value) => {
    if (value === "Neutre") {
      setNewValueStatus("Neutre");
      setChosenStatusNeutral(!chosenStatusNeutral);
      setChosenStatusFor(false);
      setChosenStatusAgainst(false);
    } else if (value === "Pour") {
      setNewValueStatus("Pour");
      setChosenStatusFor(!chosenStatusFor);
      setChosenStatusNeutral(false);
      setChosenStatusAgainst(false);
    } else if (value === "Contre") {
      setNewValueStatus("Contre");
      setChosenStatusAgainst(!chosenStatusAgainst);
      setChosenStatusFor(false);
      setChosenStatusNeutral(false);
    } else {
      setNewValueStatus("Neutre");
    }
  };

  // alert notifications when the comment is posted or if there is an error after submit
  const notifyError = () =>
    toast.error(
      "Une erreur est survenue, veuillez vérifier que vous avez bien rempli tous les champs"
    );

  const notifySuccess = () => {
    toast.success("Votre commentaire a bien été publié");
  };

  // This addComment function is used to add comments to the database in the comment table when a user send a new comment on a decision.
  // It also sends the new comment to th front so it is automatically displayed
  function addComment() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      content: valueNewComment,
      vote: newValueStatus,
      user_id: user.id,
      date_creation: dateConvertedToSqlFormat(Date.now()),
      decision_id: valuesDetailsDecision.id,
    });

    fetch(`${backEnd}/decision/${idParam.id}/comments`, {
      method: "POST",
      redirect: "follow",
      body: raw,
      headers: myHeaders,
    })
      .then((response) => {
        if (response.status === 201) {
          notifySuccess();
          toggleUpdateDecision();
          setValueNewComment("");
          setNewValueStatus("");
          handleStatus();
        } else {
          notifyError();
        }
      })

      .catch(() => notifyError());
  }

  const updateDecisionCommentById = (idCom, content, status) => {
    // dans valuesDetailsDecision.comments
    // je vais chercher le commentaire par son id avec un find
    // je mets à jour
    const commentIndex = valuesDetailsDecision.comments.findIndex(
      (comment) => comment.id === idCom
    );
    valuesDetailsDecision.comments[commentIndex].content = content;
    valuesDetailsDecision.comments[commentIndex].status = status;
    toggleUpdateDecision();
  };

  const { t } = useTranslation();

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row mx-6 md:items-center">
        <h2 className="mt-4 mb-3">{t("Commentaire details")} :</h2>
        <div className="flex flex-row mt-4">
          <button
            type="button"
            onClick={() => handleStatus("Neutre")}
            className={`md:ml-10 flex items-center justify-center h-10 pl-2 pr-2 rounded-xl w-20 mb-4 ${
              chosenStatusNeutral
                ? "bg-light-blue text-white "
                : "border-2 border-light-blue text-light-blue"
            }`}
          >
            {t("Neutre vote")}
          </button>
          <button
            type="button"
            onClick={() => handleStatus("Pour")}
            className={`ml-2 md:ml-10 flex items-center justify-center h-10 pl-2 pr-2 rounded-xl w-20 mb-4 ${
              chosenStatusFor
                ? "bg-light-green text-white "
                : "border-2 border-light-green text-light-green"
            }`}
          >
            {t("Pour vote")}
          </button>
          <button
            type="button"
            onClick={() => handleStatus("Contre")}
            className={`ml-2 md:ml-10 flex items-center justify-center h-10 pl-2 pr-2 rounded-xl w-20 mb-4 ${
              chosenStatusAgainst
                ? "bg-red-pink text-white "
                : "border-2 border-red-pink text-red-pink"
            }`}
          >
            {t("Contre vote")}
          </button>
        </div>
      </div>
      <ReactQuill
        theme="snow"
        value={valueNewComment}
        onChange={setValueNewComment}
        modules={modules}
      />

      {/* when this button is clicked it enables the addComment function */}
      <div className="flex flex-row justify-between mr-4">
        <div> </div>
        <button
          type="button"
          onClick={() => {
            addComment();
          }}
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl my-6"
        >
          {t("Envoyer btn")}
        </button>
      </div>
      {/* display comments */}
      <div className="my-6">
        <ul>
          {valuesDetailsDecision.comments?.map((comment) => (
            <Comment
              key={comment.id}
              valuesDetailsDecision={valuesDetailsDecision}
              urlAvatarStatus={urlAvatarStatus}
              comment={comment}
              toggleUpdateDecision={toggleUpdateDecision}
              updateDecisionCommentById={updateDecisionCommentById}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AccordionCommentsPart;
