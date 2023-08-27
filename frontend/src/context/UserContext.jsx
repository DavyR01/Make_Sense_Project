import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useLocalStorage("tokeeen", "");
  const backEnd = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch(`${backEnd}/user/bytoken`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.warn("error", error));
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);
// en utilisant une fonction intermédiaire, vous encapsulez l'appel à useContext(CurrentUserContext) dans une fonction personnalisée (contrairement à l'appel direct). Nous aurons donc plus de flexibilité pour gérer les opérations personnalisées et les modifications futures du hook.
