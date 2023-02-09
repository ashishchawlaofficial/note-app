import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const Protected = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const userId = sessionStorage.getItem("userId");

  return isLoggedIn || userId ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" replace state={{ from: location }} />
  );
};

export default Protected;
