import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./styles/showcase.css";
import App from "./App.jsx";

/* The single-file build has no server to rewrite /work/... back to
   index.html, so it uses hash routing. Normal hosted builds keep clean URLs. */
const Router = __HASH_ROUTER__ ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
