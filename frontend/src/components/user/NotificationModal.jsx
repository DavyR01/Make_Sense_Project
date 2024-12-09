/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Modal } from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import "../../css/user/sidebar.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function NotificationModal({ setShowModal, showModal }) {
  const { user, token } = useCurrentUserContext();
  const { t } = useTranslation();
  const [notifs, setNotifs] = useState([]);
  const { dark } = useCurrentDarkContext();
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (decisionId) => {
      setShowModal(false);
      navigate(`/decision/${decisionId}`);
    },
    [navigate, setShowModal]
  );

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      headers: myHeader,
    };
    fetch(`${backEnd}/notification/${user.id}`, requestOptions)
      .then((response) => {
        //   console.log("response :", response.json);
        return response.json();
      })
      .then((result) => {
        //   console.log("result :", result);
        setNotifs(result);
      })
      .catch((error) => console.warn("error", error));
  }, [token]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="fixed top-0 left-0 z-30">
      {showModal && (
        <div className="bg-dark-header fixed inset-0 bg-opacity-50 transition-opacity" />
        //   <div className="bg-dark-header fixed inset-0 bg-opacity-50 transition-opacity" />
      )}
      <Modal
        //   ref={modalRef}
        //   className={` bg-transparent shake ${
        //     //   className={` bg-green-500 shake ${
        //     open && showModal ? " rounded-r-xl w-full" : ""
        //   }`}
        className="lg:ml-[274px] lg:mt-[110px] rounded-r-xl shake bg-transparent"
        show={showModal}
        position="top-left"
        //   position={open && showModal ? "center" : "top-left"}
        //   position="top-left"
        size="xl"
        onClose={() => setShowModal(false)}
      >
        <div
          ref={modalRef}
          //  style={{ width: "400px", marginLeft: "300px", marginTop: "100px" }}
          //  w-[400px] ml-[300px] mt-[100px] md:w-full md:ml-0 md:mt-0
          className={` ${!dark ? "border border-white rounded-lg" : ""}`}
        >
          {/* {document.body.classList.add("!bg-green-500")}; */}
          <Modal.Header
            // ref={modalRef}
            className={`pl-3 pr-3 pt-6 pb-6  text-slate-50 align-middle rounded-tr-lg ${
              dark ? "bg-light-blue" : "bg-dark-bg"
            }`}
          >
            <div className="text-white pl-3">{t("Notifications title")}:</div>
          </Modal.Header>
          <Modal.Body
            // ref={modalRef}
            className={dark ? "bg-gray-200" : "bg-dark-header"}
          >
            <div className="pl-5 pr-2 grid grid-cols-1 divide-y text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {notifs.length > 0 ? (
                <ul className="list-disc">
                  {notifs?.map((notif) => (
                    <li className="py-1" key={notif.id}>
                      {t("Identifié sur la decision")} :{" "}
                      {/* <NavLink to={`/decision/${notif.decision_id}`}> */}
                      <span
                        onClick={() => {
                          handleNavigation(notif.decision_id);
                          //   window.reload();
                          //   setShowModal(false);
                          //   navigate(`/decision/${notif.decision_id}`);
                        }}
                      >
                        <span className="text-blue-gray-700 underline cursor-pointer">
                          {notif.title}
                        </span>
                      </span>
                      {/* </NavLink> */}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>{t("No notifications")}</div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer
            className={`pt-0 pb-3 ${dark} ? "bg-gray-200" : "bg-dark-header"`}
          >
            <Button
              className={` rounded-xl ${dark ? "bg-light-blue" : "bg-dark-bg "}`}
              onClick={() => setShowModal(false)}
              color="gray"
            >
              <div className={dark ? "text-slate-50" : "text-white"}>
                {t("Fermer btn")}
              </div>
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default NotificationModal;
