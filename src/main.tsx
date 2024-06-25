import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Application } from "@pixi/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Application attachToDevTools>
      <App />
    </Application>
  </React.StrictMode>
);
