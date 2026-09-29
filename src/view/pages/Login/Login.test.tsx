import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Login from "./Login";

let mockAccounts: Array<{ name?: string; username: string }> = [];

vi.mock("@azure/msal-react", () => ({
  useMsal: () => ({
    instance: { loginPopup: vi.fn(), loginRedirect: vi.fn(), logoutPopup: vi.fn() },
    accounts: mockAccounts,
  }),
  AuthenticatedTemplate: ({ children }: { children: ReactNode }) =>
    mockAccounts.length > 0 ? <>{children}</> : null,
  UnauthenticatedTemplate: ({ children }: { children: ReactNode }) =>
    mockAccounts.length === 0 ? <>{children}</> : null,
}));

describe("Login", () => {
  it("shows both sign-in buttons when signed out", () => {
    mockAccounts = [];
    render(<Login />);

    expect(
      screen.getByRole("button", { name: /sign in \(separate window\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in \(same window\)/i })
    ).toBeInTheDocument();
  });

  it("shows the account profile instead of the sign-in buttons once signed in", () => {
    mockAccounts = [{ name: "Test User", username: "test.user@example.com" }];
    render(<Login />);

    expect(
      screen.queryByRole("button", { name: /sign in \(separate window\)/i })
    ).not.toBeInTheDocument();
    expect(screen.getByText(/signed in as/i)).toBeInTheDocument();
  });
});
