import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || !user.accessToken) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
