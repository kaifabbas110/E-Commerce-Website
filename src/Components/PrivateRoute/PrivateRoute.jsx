import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();
  // console.log(user);
  if (user) {
    return children; // Render the children when the user is authenticated
  } else {
    return <Navigate to="/" />; // Redirect to the home page when the user is not authenticated
  }
};

export default PrivateRoute;
