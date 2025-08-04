import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeBuilderCss } from "builder-css";
import App from "./App.tsx";

initializeBuilderCss();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
