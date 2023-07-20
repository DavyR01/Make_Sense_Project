import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useLocalStorage("token", "");
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
