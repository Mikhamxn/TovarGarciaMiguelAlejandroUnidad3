import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TemaProveedor } from "./contexts/TemaContexto";
import { AuthProveedor } from "./contexts/AuthContexto";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TemaProveedor>
      <AuthProveedor>
        <App />
      </AuthProveedor>
    </TemaProveedor>
  </React.StrictMode>
);
