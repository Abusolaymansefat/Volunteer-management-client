import { useContext } from "react";
// import { AuthContex } from "../contexts/AuthContexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="text-center">Loading...</div>;

  if (!user) {
  
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

