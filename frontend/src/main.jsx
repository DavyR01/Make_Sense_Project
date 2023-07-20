import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { CurrentUserContextProvider } from "./context/UserContext";
import { CurrentDarkContextProvider } from "./context/DarkContext";
import { CurrentLangContextProvider } from "./context/LangContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CurrentUserContextProvider>
      <CurrentLangContextProvider>
        <CurrentDarkContextProvider>
          <App />
        </CurrentDarkContextProvider>
      </CurrentLangContextProvider>
    </CurrentUserContextProvider>
  </BrowserRouter>
);
