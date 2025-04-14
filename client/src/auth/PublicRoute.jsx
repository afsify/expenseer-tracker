import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { getAdmin } from "../services/adminService";
import { Navigate, Outlet } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertSlice";

function PublicRoute({ role, route }) {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "admin") {
          const response = await getAdmin();
          setAuth(response.data.auth);
        } else if (role === "user") {
          const response = await getUser();
          setAuth(response.data.auth);
        }
      } catch (error) {
        setAuth(false);
        console.error(error);
      } finally {
        dispatch(hideLoading());
      }
    };
    fetchData();
  }, [role, dispatch]);

  if (auth === null) {
    dispatch(showLoading());
    return null;
  }

  return auth ? <Navigate to={route} /> : <Outlet />;
}

PublicRoute.propTypes = {
  role: PropTypes.node.isRequired,
  route: PropTypes.node.isRequired,
};

export default PublicRoute;
