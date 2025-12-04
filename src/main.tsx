import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.tsx";
import QueryProvider from "./providers/QueryProviders.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Toaster />
      <App />
    </QueryProvider>
  </StrictMode>
);
