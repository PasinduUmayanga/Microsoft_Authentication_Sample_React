import { loginWithAzureApi } from "./Login.api";

const Login = () => {
  const loginWithAzure = (): void => {
    loginWithAzureApi();
  };

  return (
    <>
      <button onClick={() => loginWithAzure()}>LoginWithAzure</button>
    </>
  );
};
export default Login;
