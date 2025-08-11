import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useLocalStorage("tokeeen", "");
  const backEnd = import.meta.env.VITE_BACKEND_URL;

  const handleApiResponse = async (response) => {
    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.code === "TOKEN_EXPIRED") {
        setToken(""); // Supprime le token
        setUser({}); // Réinitialise l'utilisateur
        window.location.href = "/"; // Redirection
      }
    }
    return response;
  };

  useEffect(() => {
    if (!token) return; // Ne pas faire d'appel si pas de token

    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${backEnd}/user/bytoken`, requestOptions)
      .then(handleApiResponse) // Vérification de l'expiration
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.warn("error", error));
  }, [token, handleApiResponse]);

  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, token, setToken, handleApiResponse }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);
// en utilisant une fonction intermédiaire, vous encapsulez l'appel à useContext(CurrentUserContext) dans une fonction personnalisée (contrairement à l'appel direct). Nous aurons donc plus de flexibilité pour gérer les opérations personnalisées et les modifications futures du hook.
