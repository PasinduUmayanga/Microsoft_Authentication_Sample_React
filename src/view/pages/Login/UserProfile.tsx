import { useMsal } from "@azure/msal-react";

// Shown once a user has signed in via either flow; both flows converge on
// the same MSAL active account, so this component doesn't need to know
// which one was used.
const UserProfile = () => {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  if (!account) {
    return null;
  }

  const signOut = (): void => {
    instance.logoutPopup({ account });
  };

  return (
    <div className="user-profile">
      <p className="user-profile__greeting">
        Signed in as <strong>{account.name || account.username}</strong>
      </p>
      <p className="user-profile__username">{account.username}</p>
      <button
        type="button"
        className="login-button login-button--signout"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default UserProfile;
