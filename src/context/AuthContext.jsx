import { createContext, useContext, useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT from local storage
    if (token) {
      isExpired(token)
        .then((isValid) => {
          if (isValid) {
            setJwt(token);
          } else {
            navigate("/login"); // Redirect if JWT is invalid
          }
        })
        .catch((error) => {
          setError(error);
          navigate("/login"); // Redirect to login if error occurs
        });
    } else {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  const logout = () => {
    setJwt(null);
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ jwt, setJwt, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
