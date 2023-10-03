import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import css from "../Everything-Page/Everything.module.css";

const AuthWrapper = ({ children }) => {
  const { error, isLoading } = useAuth0();
  if (isLoading) {
    return "";
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }
  return <>{children}</>;
};

export default AuthWrapper;
