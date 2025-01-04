// src/components/ProtectedRoute.jsx
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { jwt } = useAuth(); // Access JWT from AuthContext

  return (
    <Route
      {...rest}
      render={(props) =>
        jwt ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
