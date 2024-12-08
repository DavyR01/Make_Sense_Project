/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";
import Logo from "../../assets/logo-makesense.png";
import LogoWhite from "../../assets/make_sense_white.png";
import AlertDeleteDecision from "../../components/user/AlertDeleteDecision";
import { useCurrentDarkContext } from "../../context/DarkContext";
import { useCurrentUserContext } from "../../context/UserContext";
import "../../css/administrator/usersList.css";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function UsersList() {
  const { user, token } = useCurrentUserContext();
  const [users, setUsers] = useState([]);

  // Gestion modal et suppression décision
  const [openModalAlertDelete, setOpenModalAlertDelete] = useState(false);
  const [deleteIsConfirm, setDeleteIsConfirm] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState();

  // extra
  const { dark } = useCurrentDarkContext();
  const { t } = useTranslation();

  // for alert notification error delete user after submit
  const notify = () =>
    toast.error(
      "Une erreure est survenue, veuillez recommencer ou contacter l'administrateur du site"
    );

  // // function to update the array of users after delete one user
  // const updateArrayUsersAfterDelete = (idUserToDelete) => {
  //   setUsers((prevUsers) =>
  //     prevUsers.filter((user) => user.id !== idUserToDelete)
  //   );
  // };

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

  const handleDeleteUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    toast
      .promise(
        fetch(`${backEnd}/user/${idUserToDelete}`, {
          method: "delete",
          redirect: "follow",
          headers: myHeaders,
        }),
        {
          loading: "Suppression en cours",
          success: "La suppression de l'utilisateur a bien été transmise",
          error:
            "Une erreur sur le serveur est survenue lors de la suppression",
        }
      )

      // const requestOptions = {
      //   method: "DELETE",
      //   headers: myHeaders,
      // };
      // fetch(`${backEnd}/admin/user/${id}`, requestOptions) // route admin de trop ?
      .then((response) => {
        if (response.status !== 204) {
          console.warn("error", response.status);
          notify();
        }
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== idUserToDelete)); // similaire à ce qui suit sauf que l'on n'utilise pas de callback.
        // setUsers((prevUsers) =>
        //   prevUsers.filter((user) => user.id !== idUserToDelete)
        // );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (deleteIsConfirm) {
      setOpenModalAlertDelete(false);
      handleDeleteUser();
      setDeleteIsConfirm(false);
    } else {
      setDeleteIsConfirm(false);
    }
  }, [deleteIsConfirm]);

  return (
    <div
      className={`w-screen z-0 overflow-y-hidden ${
        dark ? "text-black" : "text-white bg-dark-header"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <AlertDeleteDecision
        openModalAlertDelete={openModalAlertDelete}
        setOpenModalAlertDelete={setOpenModalAlertDelete}
        setdeleteIsConfirm={setDeleteIsConfirm}
      />
      <div
        className={`flex flex-row items-center justify-between  ${
          dark
            ? "text-black bg-light-grey"
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

      {/* CREATION COLUMNS */}

      <div
        style={{
          /*  width: "640px", maxWidth: "none",  */ overflowX: "auto",
        }}
        className={`md:w-[95%] m-auto h-auto sm-max: w-640 ${
          dark ? "text-black" : "text-white"
        }`}
      >
        <div
          //  style={{ width: "100%", minWidth: "640px" }}
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
                setIdUserToDelete(user.id);
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
