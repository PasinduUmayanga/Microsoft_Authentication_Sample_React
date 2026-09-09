# Microsoft Authentication Sample React

[![Build status](https://ci.appveyor.com/api/projects/status/github/PasinduUmayanga/Microsoft_Authentication_Sample_React?branch=main&svg=true)](https://ci.appveyor.com/project/PasinduUmayanga/microsoft-authentication-sample-react/branch/main)
[![Build History](https://img.shields.io/badge/AppVeyor-Build%20History-blue?logo=appveyor)](https://ci.appveyor.com/project/PasinduUmayanga/microsoft-authentication-sample-react/history)
[![Web on GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Web-222222?logo=githubpages&logoColor=white)](https://pasinduumayanga.github.io/Microsoft_Authentication_Sample_React/)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-package%20manager-CB3837?logo=npm&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)
[![Last commit](https://img.shields.io/github/last-commit/PasinduUmayanga/Microsoft_Authentication_Sample_React)](https://github.com/PasinduUmayanga/Microsoft_Authentication_Sample_React/commits/main)

Microsoft Authentication Sample React is a small TypeScript React application that demonstrates Microsoft Entra ID authentication with the Microsoft Authentication Library (MSAL). The app renders a single login page with an Azure sign-in button, reads authentication settings from `REACT_APP_*` environment variables, opens the Microsoft login flow with `loginPopup`, and requests access tokens with `acquireTokenPopup`.

The project is built with Create React App and is configured for GitHub Pages deployment.

## Project Structure

- `src/App.tsx` renders the login page as the main application view.
- `src/view/pages/Login/Login.tsx` contains the login button UI and delegates authentication to the login API module.
- `src/view/pages/Login/Login.api.ts` configures MSAL, initializes `PublicClientApplication`, starts the popup login flow, and requests Microsoft Graph-related scopes.
- `src/common/commom.functions.ts` maps environment variables into the app configuration object.
- `src/common/common.types.ts` defines the shared `AppOptions` shape.
- `src/common/common.enum.ts` defines supported login window modes.
- `.env.development` contains local development configuration values for the Azure tenant, client ID, redirect URI, and scopes.

## Environment Variables

Create React App exposes variables that start with `REACT_APP_`. This project uses:

- `REACT_APP_VERSION`
- `REACT_APP_ENV`
- `REACT_APP_API_BASE_URL`
- `REACT_APP_TENANT_ID`
- `REACT_APP_CLIENT_ID`
- `REACT_APP_LOGIN_WINDOW_TYPE`
- `REACT_APP_REDIRECTURI`
- `REACT_APP_SCOPES`

## CI

AppVeyor is configured through `appveyor.yml` to install dependencies, run tests, build the app, cache npm dependencies, skip documentation-only builds, and publish the `build` folder as an artifact.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
