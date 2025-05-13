import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserManagement from "../Pages/UserManagement/UserManagement";
import ProfilePage from "../Pages/AdminProfile/ProfilePage";
import UserRequest from "../Pages/UserRequest/UserRequest";
import Earnings from "../Pages/Earnings/Earnings";
import VerifyCode from "../Pages/Auth/VerifyCode/VerifyCode";
import NewPass from "../Pages/Auth/NewPass/NewPass";
import TransectionHistory from "../Pages/TransectionHistory/TransectionHistory";
import AllProduct from "../Pages/AllProduct/AllProduct";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },
  {
    path: "/forgate-password",
    element: <ForgatePassword/>,
  },
  {
    path: "/verify-code",
    element: <VerifyCode/>,
  },

  {
    path: "/new-password",
    element: <NewPass/>,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/user-management",
            element: <UserManagement />,
          },
           {
            path: "/transection-history",
            element: <TransectionHistory/>,
          },
            {
            path: "/all-products",
            element: <AllProduct/>,
          },
          {
            path: "/settings/about-us",
            element: <AboutUs />,
          },
          {
            path: "/settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "/settings/terms-condition",
            element: <TermsCondition />,
          },
          {
            path: "/profile",
            element: <ProfilePage/>,
          },
  
        ],
      },
    ],
  },
]);
