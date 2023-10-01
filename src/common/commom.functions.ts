import { EnumLoginWindowType } from "./common.enum";
import { AppOptions } from "./common.types";

export const GetAppOptions = (): AppOptions => {
  let appOptions: AppOptions = {
    Version: process.env.REACT_APP_VERSION,
    Environment: process.env.REACT_APP_ENV,
    APIURL: process.env.REACT_APP_API_BASE_URL,
    TenantId: process.env.REACT_APP_TENANT_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
    RedirectUri: process.env.REACT_APP_REDIRECTURI,
    CommonWindowType: process.env.REACT_APP_LOGIN_WINDOW_TYPE,
    Scopes: process.env["REACT_APP_SCOPES"]?.split(",") as Array<string>,
  };

  return appOptions;
};
