import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import LoginButtons from "./LoginButtons";
import UserProfile from "./UserProfile";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-card">
      <h1 className="login-card__title">Microsoft Authentication Sample</h1>

      <AuthenticatedTemplate>
        <UserProfile />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <p className="login-card__subtitle">Choose how you'd like to sign in:</p>
        <LoginButtons />
      </UnauthenticatedTemplate>
    </div>
  );
};

export default Login;
