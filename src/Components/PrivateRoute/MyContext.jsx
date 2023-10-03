import { useAuth0 } from "@auth0/auth0-react";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);
const MyContext = ({ children }) => {
  const { user } = useAuth0();
  const [myUser, setMyUser] = useState(null);
  // console.log(user);
  //   console.log(myUser);
  useEffect(() => {
    setMyUser(user);
  }, [user]);
  return (
    <UserContext.Provider value={{ myUser }}>{children}</UserContext.Provider>
  );
};

export default MyContext;
