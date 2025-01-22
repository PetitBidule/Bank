import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const token = localStorage.getItem("jwt");

  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default Protected;
