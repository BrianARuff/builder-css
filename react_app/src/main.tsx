import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeZeroCss } from "zero-css";
import App from "./App.tsx";

initializeZeroCss();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
