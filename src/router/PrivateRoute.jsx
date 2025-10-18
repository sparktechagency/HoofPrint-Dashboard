import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.warn("Failed to parse user from localStorage:", err);
    user = null; // fallback if parsing fails
  }

  if (!user || !user.accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
