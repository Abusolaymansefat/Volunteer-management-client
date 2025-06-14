import { useContext } from "react";
import { AuthContex } from "../contexts/AuthContexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContex);
  const location = useLocation();

  if (loading) return <div className="text-center">Loading...</div>;

  if (!user) {
  
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

