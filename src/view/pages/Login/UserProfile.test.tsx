import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import UserProfile from "./UserProfile";

const logoutPopup = vi.fn();
let mockAccounts: Array<{ name?: string; username: string }> = [];

vi.mock("@azure/msal-react", () => ({
  useMsal: () => ({
    instance: { logoutPopup },
    accounts: mockAccounts,
  }),
}));

describe("UserProfile", () => {
  it("renders nothing when there is no active account", () => {
    mockAccounts = [];
    const { container } = render(<UserProfile />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the signed-in account name and username", () => {
    mockAccounts = [{ name: "Test User", username: "test.user@example.com" }];
    render(<UserProfile />);
    expect(screen.getByText(/signed in as/i)).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test.user@example.com")).toBeInTheDocument();
  });

  it("calls instance.logoutPopup when Sign out is clicked", async () => {
    mockAccounts = [{ name: "Test User", username: "test.user@example.com" }];
    logoutPopup.mockReset();
    const user = userEvent.setup();
    render(<UserProfile />);

    await user.click(screen.getByRole("button", { name: /sign out/i }));

    expect(logoutPopup).toHaveBeenCalledTimes(1);
  });
});
