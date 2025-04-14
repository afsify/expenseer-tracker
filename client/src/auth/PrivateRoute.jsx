import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { userActions } from "../redux/userSlice";
import { userPath } from "../routes/routeConfig";
import { getUser } from "../services/userService";
import { Navigate, Outlet } from "react-router-dom";
import { getAdmin } from "../services/adminService";
import { showLoading, hideLoading } from "../redux/alertSlice";

function PrivateRoute({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "admin") {
          const response = await getAdmin();
          setAuth(response.data.auth);
        } else if (role === "user") {
          const response = await getUser();
          if (response.data.auth) {
            const isBlocked = response.data.userData.status === "blocked";
            if (isBlocked) {
              localStorage.removeItem("userToken");
              localStorage.removeItem("userData");
              dispatch(userActions.logout());
              navigate(userPath.login);
              toast.error("You were blocked");
              return setAuth(false);
            }
            dispatch(userActions.login());
          } else {
            dispatch(userActions.logout());
          }
          setAuth(response.data.auth);
        }
      } catch (error) {
        setAuth(false);
        console.error(error);
        dispatch(hideLoading());
      } finally {
        dispatch(hideLoading());
      }
    };
    fetchData();
  }, [role, dispatch, navigate]);

  if (auth === null) {
    dispatch(showLoading());
    return null;
  }

  return auth ? <Outlet /> : <Navigate to={userPath.login} />;
}

PrivateRoute.propTypes = {
  role: PropTypes.node.isRequired,
};

export default PrivateRoute;
