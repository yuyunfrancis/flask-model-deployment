import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
