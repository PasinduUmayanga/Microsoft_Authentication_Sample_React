import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import type { AuthError } from "@azure/msal-browser";
import { loginRequest } from "../../../auth/authConfig";
import { EnumLoginWindowType } from "../../../common/common.enum";

// Renders the two supported sign-in entry points: a popup (separate window)
// flow and a redirect (same window) flow, both requesting the same scopes.
const LoginButtons = () => {
  const { instance } = useMsal();
  const [pendingFlow, setPendingFlow] = useState<EnumLoginWindowType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const signInWithPopup = async (): Promise<void> => {
    setError(null);
    setPendingFlow(EnumLoginWindowType.Popup);
    try {
      await instance.loginPopup(loginRequest);
    } catch (err) {
      // The user closing the popup is the most common "error" here.
      setError((err as AuthError).errorMessage || "Sign-in was cancelled or failed.");
    } finally {
      setPendingFlow(null);
    }
  };

  const signInWithRedirect = async (): Promise<void> => {
    setError(null);
    setPendingFlow(EnumLoginWindowType.InWindow);
    try {
      // loginRedirect navigates the current window away immediately, so in a
      // real browser this promise only rejects for setup errors, not user
      // cancellation (there is no "cancel" once the browser has navigated).
      await instance.loginRedirect(loginRequest);
    } catch (err) {
      setError((err as AuthError).errorMessage || "Sign-in failed.");
      setPendingFlow(null);
    }
  };

  return (
    <div className="login-actions">
      <button
        type="button"
        className="login-button login-button--popup"
        onClick={signInWithPopup}
        disabled={pendingFlow !== null}
      >
        {pendingFlow === EnumLoginWindowType.Popup
          ? "Signing in…"
          : "Sign in (separate window)"}
      </button>
      <button
        type="button"
        className="login-button login-button--redirect"
        onClick={signInWithRedirect}
        disabled={pendingFlow !== null}
      >
        {pendingFlow === EnumLoginWindowType.InWindow
          ? "Redirecting…"
          : "Sign in (same window)"}
      </button>
      {error && (
        <p role="alert" className="login-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default LoginButtons;
