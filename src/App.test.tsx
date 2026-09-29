import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("@azure/msal-react", () => ({
  useMsal: () => ({
    instance: { loginPopup: vi.fn(), loginRedirect: vi.fn(), logoutPopup: vi.fn() },
    accounts: [],
  }),
  AuthenticatedTemplate: () => null,
  UnauthenticatedTemplate: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("App", () => {
  it("renders the separate-window and same-window sign-in buttons", () => {
    render(<App />);

    expect(
      screen.getByRole("button", { name: /sign in \(separate window\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in \(same window\)/i })
    ).toBeInTheDocument();
  });
});
