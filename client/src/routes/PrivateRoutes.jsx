import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
