import { AppOptions } from "./common.types";

// Vite exposes only VITE_-prefixed variables on import.meta.env (see src/vite-env.d.ts).
export const GetAppOptions = (): AppOptions => {
  const appOptions: AppOptions = {
    Version: import.meta.env.VITE_VERSION,
    Environment: import.meta.env.VITE_ENV,
    APIURL: import.meta.env.VITE_API_BASE_URL,
    TenantId: import.meta.env.VITE_TENANT_ID,
    ClientId: import.meta.env.VITE_CLIENT_ID,
    RedirectUri: import.meta.env.VITE_REDIRECT_URI,
    Scopes: (import.meta.env.VITE_SCOPES ?? "")
      .split(",")
      .map((scope) => scope.trim())
      .filter(Boolean),
  };

  return appOptions;
};
