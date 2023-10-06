import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthWrapper from "./Components/PrivateRoute/AuthWrapper.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ugfglenlqywux8gq.us.auth0.com"
      clientId="VlOC3P05IHcFeUq4SrfPxjIkzTKvrLzi"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <AuthWrapper>
          <App />
        </AuthWrapper>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
