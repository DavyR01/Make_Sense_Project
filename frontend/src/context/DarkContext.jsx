import { createContext, useState, useContext } from "react";

const CurrentDarkContext = createContext();

export default CurrentDarkContext;

export function CurrentDarkContextProvider({ children }) {
  const [dark, setDark] = useState(true);

  const toggleDark = () => {
    setDark(!dark);
  };

  return (
    <CurrentDarkContext.Provider value={{ dark, toggleDark }}>
      {children}
    </CurrentDarkContext.Provider>
  );
}

export const useCurrentDarkContext = () => useContext(CurrentDarkContext);
