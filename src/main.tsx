import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartCtx } from "./contexts/CartCtx.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartCtx>
      <App />
    </CartCtx>
  </StrictMode>
);
