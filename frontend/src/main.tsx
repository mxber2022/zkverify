import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AccountProvider } from "./contexts/AccountContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccountProvider>
      <App />
    </AccountProvider>
  </StrictMode>
);
