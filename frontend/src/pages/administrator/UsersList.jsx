/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import "../../css/administrator/usersList.css";
import AlertDeleteDecision from "../../components/user/AlertDeleteDecision";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function UsersList() {
  const { user, token } = useCurrentUserContext();
  const [users, setUsers] = useState([]);
  const [openModalAlertDelete, setOpenModalAlertDelete] = useState(false);
  const [deleteIsConfirm, setDeleteIsConfirm] = useState(false);
  const [id, setId] = useState();
  const { t } = useTranslation();
  const { dark } = useCurrentDarkContext();

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };
    fetch(`${backEnd}/user`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const deleteUser = () => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeader,
    };
    fetch(`${backEnd}/admin/user/${id}`, requestOptions)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (deleteIsConfirm) {
      setOpenModalAlertDelete(false);
      deleteUser();
      setDeleteIsConfirm(false);
    } else {
      setDeleteIsConfirm(false);
    }
  }, [deleteIsConfirm]);
  return (
    <div
      className={`w-screen z-0${
        dark ? "text-black" : "text-white bg-dark-header"
      }`}
    >
      <AlertDeleteDecision
        openModalAlertDelete={openModalAlertDelete}
        setOpenModalAlertDelete={setOpenModalAlertDelete}
        setdeleteIsConfirm={setDeleteIsConfirm}
      />
      <div
        className={`flex flex-row items-center justify-between bg-light-grey ${
          dark
            ? "text-black"
            : "text-white bg-dark-header border-b-2 border-dark-bg"
        }`}
      >
        <div className="flex flex-col">
          {user ? (
            <p className="pl-10 pt-3 text-xl">{t("Liste utilisateurs")}</p>
          ) : (
            <p className="pl-10 pt-3 text-xl">{t("Bonjour home")}</p>
          )}
          <p className="pl-10 text-x font-extralight">
            {t("Nous sommes le")} : {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="logo-home">
          {dark ? (
            <img src={Logo} alt="logo make-sense" />
          ) : (
            <img src={LogoWhite} alt="logo make-sense" />
          )}
        </div>
      </div>

      <div
        className={`md:w-[95%] m-auto h-auto ${
          dark ? "text-black" : "text-white"
        }`}
      >
        <div
          className={`grid grid-cols-6 items-center ${
            dark ? "bg-gray-200" : "bg-dark-bg border-gray-400"
          }bg-gray-400 h-12 mt-10 justify-center rounded-sm`}
        >
          {" "}
          <BsTrash className="w-12 h-5" />
          <p className="col-start-2 ">Avatar</p>
          <p className="col-start-3 text-center">{t("Nom, prénom")}</p>
          <p className="col-start-4 col-end-6 text-center">Email</p>
          <p className="col-start-6 col-end-7 text-center">Phone</p>
        </div>
        {users.map((user) => (
          <div
            type="button"
            key={user.id}
            className={
              user.id % 2 === 0
                ? `grid pt-2 pb-2 grid-cols-6 items-center ${
                    dark ? "bg-gray-200" : "bg-dark-header"
                  }  h-auto min-h-min	justify-center border-b-2 border-gray-400	w-full `
                : `grid pt-2 pb-2 grid-cols-6 items-center${
                    dark ? "bg-gray-300" : "bg-dark-header"
                  } h-auto min-h-min	justify-center hover:bg-gray-400 hover:text-black border-b-2 border-gray-400	w-full `
            }
          >
            <button
              type="button"
              onClick={() => {
                setOpenModalAlertDelete(true);
                setId(user.id);
              }}
            >
              <BsTrash className="w-12 h-5" />
            </button>
            <img
              src={`${backEnd}/avatar/${user?.avatar}`}
              alt="avatar"
              className="col-start-2 col-end-3 w-8 h-8 rounded-full"
            />
            <p className="col-start-3 text-center">
              {user.firstname} {user.lastname}
            </p>
            <p className="col-start-4 col-end-6 text-center">{user.email}</p>
            <button type="button" className="col-start-6 col-end-7 text-center">
              <p>{user.phone}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
