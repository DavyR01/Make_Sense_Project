import { createContext, useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useLocalStorage("tokeeen", "");

  // Fonction utilitaire pour gérer l'expiration des tokens
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
