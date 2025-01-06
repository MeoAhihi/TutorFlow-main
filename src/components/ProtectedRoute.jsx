import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { jwt } = useAuth();

  if (!jwt) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
