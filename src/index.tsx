import React from "react";
import ReactDOM from "react-dom/client";
import { LibraryApp } from "./components/LibraryApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LibraryApp />
  </React.StrictMode>
);
