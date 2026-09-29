import { afterEach, describe, expect, it, vi } from "vitest";
import { GetAppOptions } from "./commom.functions";

describe("GetAppOptions", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("maps VITE_ environment variables onto AppOptions", () => {
    vi.stubEnv("VITE_VERSION", "9.9.9");
    vi.stubEnv("VITE_ENV", "UnitTest");
    vi.stubEnv("VITE_TENANT_ID", "tenant-123");
    vi.stubEnv("VITE_CLIENT_ID", "client-456");
    vi.stubEnv("VITE_REDIRECT_URI", "http://localhost:5173/");
    vi.stubEnv("VITE_SCOPES", "openid, profile, User.Read");

    expect(GetAppOptions()).toEqual({
      Version: "9.9.9",
      Environment: "UnitTest",
      APIURL: undefined,
      TenantId: "tenant-123",
      ClientId: "client-456",
      RedirectUri: "http://localhost:5173/",
      Scopes: ["openid", "profile", "User.Read"],
    });
  });

  it("returns an empty Scopes array when VITE_SCOPES is not set", () => {
    vi.stubEnv("VITE_SCOPES", "");
    expect(GetAppOptions().Scopes).toEqual([]);
  });
});
