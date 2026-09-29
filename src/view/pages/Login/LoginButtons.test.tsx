import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginButtons from "./LoginButtons";

const loginPopup = vi.fn();
const loginRedirect = vi.fn();

vi.mock("@azure/msal-react", () => ({
  useMsal: () => ({
    instance: { loginPopup, loginRedirect },
  }),
}));

describe("LoginButtons", () => {
  beforeEach(() => {
    loginPopup.mockReset();
    loginRedirect.mockReset();
  });

  it("renders a separate-window (popup) and a same-window (redirect) button", () => {
    render(<LoginButtons />);
    expect(
      screen.getByRole("button", { name: /sign in \(separate window\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in \(same window\)/i })
    ).toBeInTheDocument();
  });

  it("calls instance.loginPopup, not loginRedirect, when the popup button is clicked", async () => {
    loginPopup.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<LoginButtons />);

    await user.click(
      screen.getByRole("button", { name: /sign in \(separate window\)/i })
    );

    expect(loginPopup).toHaveBeenCalledTimes(1);
    expect(loginRedirect).not.toHaveBeenCalled();
  });

  it("calls instance.loginRedirect, not loginPopup, when the redirect button is clicked", async () => {
    loginRedirect.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<LoginButtons />);

    await user.click(
      screen.getByRole("button", { name: /sign in \(same window\)/i })
    );

    expect(loginRedirect).toHaveBeenCalledTimes(1);
    expect(loginPopup).not.toHaveBeenCalled();
  });

  it("shows an error message when the popup flow rejects", async () => {
    loginPopup.mockRejectedValueOnce({ errorMessage: "user_cancelled" });
    const user = userEvent.setup();
    render(<LoginButtons />);

    await user.click(
      screen.getByRole("button", { name: /sign in \(separate window\)/i })
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "user_cancelled"
    );
  });
});
