import { useContext } from "react";
import { AuthContex } from "../contexts/AuthContexts/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContex);
  if (loading) return <div className="text-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
