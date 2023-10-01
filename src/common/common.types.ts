import { EnumLoginWindowType } from "./common.enum";

export interface AppOptions {
  Version?: string;
  Environment?: string;
  APIURL?: string;
  TenantId?: string;
  ClientId?: string;
  RedirectUri?: string;
  CommonWindowType?: string;
  Scopes: Array<string>;
}
