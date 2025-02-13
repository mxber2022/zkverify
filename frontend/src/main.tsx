import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AccountProviderSubstrate } from "./contexts/AccountContext";
import "./index.css";
import "./lib/appkit.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccountProviderSubstrate>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-white/90 backdrop-blur-sm",
          duration: 4000,
          style: {
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
          },
          success: {
            iconTheme: {
              primary: "#2563eb",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </AccountProviderSubstrate>
  </StrictMode>
);
