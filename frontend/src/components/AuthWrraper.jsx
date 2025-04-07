import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const AuthWrapper = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthWrapper;
