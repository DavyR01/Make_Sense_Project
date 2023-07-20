import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { useTranslation } from "react-i18next";
import { useCurrentUserContext } from "../../context/UserContext";
import userimg from "../../assets/icons/user.png";
import edit from "../../assets/icons/edit.svg";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Comment({
  valuesDetailsDecision,
  urlAvatarStatus,
  comment,
  updateDecisionCommentById,
  toggleUpdateDecision,
}) {
  const [modifyComment, setModifyComment] = useState(false);
  const [updatedValueComment, setUpdatedValueComment] = useState(
    comment.content
  );
  const [updatedValueStatus, setUpdatedValueStatus] = useState(comment.status);
  const [chosenUpdatedStatusNeutral, setChosenUpdatedStatusNeutral] =
    useState(false);
  const [chosenUpdatedStatusFor, setChosenUpdatedStatusFor] = useState(false);
  const [chosenUpdatedStatusAgainst, setChosenUpdatedStatusAgainst] =
    useState(false);
  const { user, token } = useCurrentUserContext();
  const decisionIdParam = useParams();

  const navigate = useNavigate();

  // Define the date format for comments :
  const dateComment = (date) => {
    return date?.slice(2, 10);
  };
  const hourComment = (date) => {
    return date?.slice(11, 16);
  };

  const handleCommentEdit = () => {
    setModifyComment(!modifyComment);
    // setValueComment(comment.content);
  };
  const modules = {
    toolbar: [
      ["bold", "underline", "italic"],
      ["link", "image"],
    ],
  };

  const handleUpdatedStatus = (value) => {
    if (value === "Neutre") {
      setUpdatedValueStatus("Neutre");
      setChosenUpdatedStatusNeutral(!chosenUpdatedStatusNeutral);
      setChosenUpdatedStatusFor(false);
      setChosenUpdatedStatusAgainst(false);
    } else if (value === "Pour") {
      setUpdatedValueStatus("Pour");
      setChosenUpdatedStatusFor(!chosenUpdatedStatusFor);
      setChosenUpdatedStatusNeutral(false);
      setChosenUpdatedStatusAgainst(false);
    } else if (value === "Contre") {
      setUpdatedValueStatus("Contre");
      setChosenUpdatedStatusAgainst(!chosenUpdatedStatusAgainst);
      setChosenUpdatedStatusFor(false);
      setChosenUpdatedStatusNeutral(false);
    } else {
      setUpdatedValueStatus("Neutre");
    }
  };

  // update comments table in backend
  const updateComment = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      content: updatedValueComment,
      vote: updatedValueStatus,
      id: comment.id,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${backEnd}/decision/${decisionIdParam.id}/comments/${comment.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then(() => {
        toggleUpdateDecision();
        setModifyComment(!modifyComment);
        navigate(`/decision/${decisionIdParam.id}`);
        updateDecisionCommentById(
          `${comment.id}`,
          updatedValueComment,
          updatedValueStatus
        );
      })
      .catch((error) => console.warn("error", error));
  };
  const { t } = useTranslation();

  return (
    <li>
      <div className="flex flex-row">
        <button
          className="mx-4"
          type="button"
          onClick={() =>
            navigate(`/user-profile/${valuesDetailsDecision.user_id}`)
          }
        >
          <img
            className="w-10 h-10 rounded-full hover:opacity-25 transition ease-in-out delay-50 "
            src={
              urlAvatarStatus?.status === 200
                ? `${backEnd}/avatar/${comment?.avatar}`
                : userimg
            }
            alt={`avatar${comment.firstname}`}
          />
        </button>
        <div className="flex flex-col">
          <p className="mx-4 text-l font-bold ">
            {comment.firstname} {comment.lastname}
          </p>

          <p className="text-sm text-slate-500 mx-4 flex flex-row">
            {dateComment(comment.date_creation)} &nbsp;
            {hourComment(comment.date_creation)}&nbsp;
            <p
              className={`mx-4 font-semibold ${
                comment.vote === "Pour"
                  ? "text-light-green"
                  : comment.vote === "Contre"
                  ? "text-red-pink"
                  : "text-light-blue"
              } `}
            >
              - {comment.vote}
            </p>
            {comment.user_id === user.id ? (
              <button type="button" onClick={handleCommentEdit}>
                <img src={edit} alt="" className="h-4 mx-2" />
              </button>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      {modifyComment ? (
        <div key={comment.id}>
          <div className="flex flex-row mb-4">
            <button
              type="button"
              onClick={() => handleUpdatedStatus("Neutre")}
              className={`flex items-center justify-center mt-5 h-10 pl-2 pr-2 rounded-xl w-20 ${
                chosenUpdatedStatusNeutral
                  ? "bg-light-blue text-white "
                  : "border-2 border-light-blue text-light-blue"
              }`}
            >
              {t("Neutre vote")}
            </button>
            <button
              type="button"
              onClick={() => handleUpdatedStatus("Pour")}
              className={`ml-2 flex items-center justify-center mt-5 h-10 pl-2 pr-2 rounded-xl w-20 ${
                chosenUpdatedStatusFor
                  ? "bg-light-green text-white "
                  : "border-2 border-light-green text-light-green"
              }`}
            >
              {t("Pour vote")}
            </button>
            <button
              type="button"
              onClick={() => handleUpdatedStatus("Contre")}
              className={`ml-2 flex items-center justify-center mt-5 h-10 pl-2 pr-2 rounded-xl w-20 ${
                chosenUpdatedStatusAgainst
                  ? "bg-red-pink text-white "
                  : "border-2 border-red-pink text-red-pink"
              }`}
            >
              {t("Contre vote")}
            </button>
          </div>
          <ReactQuill
            theme="bubble"
            value={updatedValueComment}
            onChange={setUpdatedValueComment}
            modules={modules}
            className="border-2"
          />
          <button
            type="button"
            onClick={updateComment}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl my-6"
          >
            {t("Valider commentaire")}
          </button>
        </div>
      ) : (
        <div>
          <ReactQuill
            theme="bubble"
            value={comment.content}
            readOnly
            className="text-xxl"
          />
        </div>
      )}

      <hr className="mt-4 mb-8" />
    </li>
  );
}

export default Comment;
