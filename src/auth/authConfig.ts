import {
  Configuration,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";
import { GetAppOptions } from "../common/commom.functions";

const appOptions = GetAppOptions();

export const msalConfig: Configuration = {
  auth: {
    clientId: appOptions.ClientId ?? "",
    authority: `https://login.microsoftonline.com/${appOptions.TenantId}`,
    redirectUri: appOptions.RedirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage", // Use sessionStorage for token caching
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          default:
            console.debug(message);
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

// Shared by both the popup and redirect flows so they request identical scopes.
export const loginRequest = {
  scopes: appOptions.Scopes,
};

// MSAL requires a single, shared PublicClientApplication instance for the
// whole app (it must not be re-created per component/click) - see main.tsx
// for the required initialize()/handleRedirectPromise() startup sequence.
export const msalInstance = new PublicClientApplication(msalConfig);
