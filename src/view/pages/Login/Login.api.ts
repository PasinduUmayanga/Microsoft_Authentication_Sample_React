import {
  AuthenticationResult,
  Configuration,
  LogLevel,
  PublicClientApplication,
} from "@azure/msal-browser";
import { GetAppOptions } from "../../../common/commom.functions";
import { AppOptions } from "../../../common/common.types";
import { EnumLoginWindowType } from "../../../common/common.enum";

export const loginWithAzureApi = async () => {
  // Get app option(s) from env file
  const AppOptions: AppOptions = GetAppOptions();

  try {
    // MSAL config for authenticating
    const msalConfig = {
      auth: {
        clientId: AppOptions.ClientId,
        authority: `https://login.microsoftonline.com/${AppOptions.TenantId}`,
        redirectUri: AppOptions.RedirectUri,
      },
      cache: {
        cacheLocation: "sessionStorage", // Use sessionStorage for token caching
        storeAuthStateInCookie: false, // Set to false to avoid storing auth state in cookies
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
          logLevel: LogLevel.Verbose, // Set the desired log level
        },
      },
    } as Configuration;
    const msalInstance = new PublicClientApplication(msalConfig);

    await msalInstance.initialize();
    console.log(msalInstance.getActiveAccount());
    msalInstance
      .loginPopup()
      .then((response: AuthenticationResult) => {
        debugger;
      })
      .catch((error: any) => {
        alert("User cancel the flow");
        debugger;
      });
    await msalInstance.acquireTokenPopup({
      scopes: ["openid", "profile", "User.Read"],
    });
  } catch (error) {
    debugger;
    alert(error);
  }
};
