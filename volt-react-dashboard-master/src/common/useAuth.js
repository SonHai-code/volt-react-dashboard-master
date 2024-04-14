import React, { useState, useEffect, useContext } from "react";
import AuthService from "../services/auth.service";

const AuthContext = React.createContext();

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const logOut = async () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return { currentUser, logOut };
};

export const AuthProvider = ({ children }) => {
  const value = useAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useIsLoggedIn() {
  const { currentUser } = useContext(AuthContext);

  const isLoggedIn = () => {
    if (currentUser) {
      const decodedJwt = parseJwt(currentUser.accessToken);
      return decodedJwt.exp * 1000 > Date.now();
    }
    return false;
  };

  return isLoggedIn;
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
