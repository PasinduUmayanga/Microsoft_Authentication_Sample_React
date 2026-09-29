import React from "react";
import ReactDOM from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from "@azure/msal-browser";
import "./index.css";
import App from "./App";
import { msalInstance } from "./auth/authConfig";
import reportWebVitals from "./reportWebVitals";

// Keep MSAL's "active account" in sync so useMsal()/useIsAuthenticated()
// pick up the signed-in user right after either login flow completes.
msalInstance.addEventCallback((event: EventMessage) => {
  const isLoginSuccess =
    event.eventType === EventType.LOGIN_SUCCESS ||
    event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS;

  if (isLoginSuccess && event.payload) {
    const result = event.payload as AuthenticationResult;
    if (result.account) {
      msalInstance.setActiveAccount(result.account);
    }
  }
});

// MSAL must finish initializing - and, when the page is loading after a
// loginRedirect() round trip, resolve that redirect response - before any
// component is allowed to call its APIs, so rendering waits on both.
msalInstance
  .initialize()
  .then(() => msalInstance.handleRedirectPromise())
  .then(() => {
    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </React.StrictMode>
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
  });
