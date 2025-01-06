import { createContext, useContext, useState } from "react";
import { isExpired } from "react-jwt";

import { ACCESS_TOKEN } from "../constants/connector";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token && !isExpired(token) ? token : null;
  });

  const storeAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    setJwt(token);
  };

  const clearUserSession = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ jwt, storeAccessToken, clearUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
