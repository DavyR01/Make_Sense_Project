import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { CurrentDarkContextProvider } from "./context/DarkContext";
import { CurrentLangContextProvider } from "./context/LangContext";
import { CurrentUserContextProvider } from "./context/UserContext";

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
