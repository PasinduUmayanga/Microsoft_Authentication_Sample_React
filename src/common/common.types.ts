export interface AppOptions {
  Version?: string;
  Environment?: string;
  APIURL?: string;
  TenantId?: string;
  ClientId?: string;
  RedirectUri?: string;
  Scopes: Array<string>;
}
