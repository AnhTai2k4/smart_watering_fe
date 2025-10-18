import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext/UserContext.tsx";
import { DeviceProvider } from "./contexts/DeviceContext/DeviceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <DeviceProvider>
          <App />
        </DeviceProvider>
      </UserProvider>
    </StrictMode>
  </BrowserRouter>
);
