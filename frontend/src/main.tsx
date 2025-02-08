import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AccountProviderSubstrate } from "./contexts/AccountContext";
import "./index.css";
import "./lib/appkit.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccountProviderSubstrate>
      <App />
    </AccountProviderSubstrate>
  </StrictMode>
);
