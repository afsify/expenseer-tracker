import { lazy, Suspense } from "react";
import { userPath } from "./routeConfig";
import PublicRoute from "../auth/PublicRoute";
import NotFound from "../pages/error/NotFound";
import PrivateRoute from "../auth/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import ServerError from "../pages/error/ServerError";

const Home = lazy(() => import("../pages/user/Home"));
const Shop = lazy(() => import("../pages/user/Shop"));
const Cart = lazy(() => import("../pages/user/Cart"));
const Login = lazy(() => import("../pages/user/Login"));
const About = lazy(() => import("../pages/user/About"));
const SignIn = lazy(() => import("../pages/user/SignIn"));
const SignUp = lazy(() => import("../pages/user/SignUp"));
const Contact = lazy(() => import("../pages/user/Contact"));
const Profile = lazy(() => import("../pages/user/Profile"));
const Register = lazy(() => import("../pages/user/Register"));
const ResetOTP = lazy(() => import("../pages/user/ResetOTP"));
const RegisterOTP = lazy(() => import("../pages/user/RegisterOTP"));
const ResetPassword = lazy(() => import("../pages/user/ResetPassword"));
const ForgotPassword = lazy(() => import("../pages/user/ForgotPassword"));

function UserRoute() {
  return (
    <Routes>
      <Route element={<PublicRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.login} element={<Login />} />
        <Route path={userPath.signin} element={<SignIn />} />
        <Route path={userPath.signup} element={<SignUp />} />
        <Route path={userPath.resetOTP} element={<ResetOTP />} />
        <Route path={userPath.register} element={<Register />} />
        <Route path={userPath.registerOTP} element={<RegisterOTP />} />
        <Route path={userPath.resetPassword} element={<ResetPassword />} />
        <Route path={userPath.forgotPassword} element={<ForgotPassword />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
      <Route path="error" element={<ServerError />} />
      <Route path={userPath.home} element={<Home />} />
      <Route path={userPath.shop} element={<Shop />} />
      <Route path={userPath.cart} element={<Cart />} />
      <Route path={userPath.about} element={<About />} />
      <Route path={userPath.contact} element={<Contact />} />
      <Route element={<PrivateRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.profile} element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default function UserRouteWithSuspense() {
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative h-24 w-24">
            <div className="rounded-full h-24 w-24 border-t-4 border-t-blue-500 animate-spin absolute"></div>
            <div className="h-full w-full flex justify-center items-center">
              <h1 className="text-blue-500 text-3xl font-mono font-extrabold">
                &lt;/&gt;
              </h1>
            </div>
          </div>
        </div>
      }
    >
      <UserRoute />
    </Suspense>
  );
}
