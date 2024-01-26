import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "highlight.js/styles//a11y-dark.min.css";
import "./assets/css/main.css";
import "@ionic/react/css/core.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
