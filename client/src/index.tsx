import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "@web3uikit/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <NotificationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NotificationProvider>
);

reportWebVitals();
