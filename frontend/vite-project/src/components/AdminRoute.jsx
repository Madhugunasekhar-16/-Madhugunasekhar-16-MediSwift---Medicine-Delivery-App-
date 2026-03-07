import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);


  if (!user) {
    return <Navigate to="/login" replace />;
  }

 
  if (user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }


  return children;
};

export default AdminRoute;