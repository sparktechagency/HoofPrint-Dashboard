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
import VerifyCode from "../Pages/Auth/VerifyCode/VerifyCode";
import TransectionHistory from "../Pages/TransectionHistory/TransectionHistory";
import AllProduct from "../Pages/AllProduct/AllProduct";
import UpdatePassword from "../Pages/Auth/UpdatePassword/UpdatePassword";
import ProductList from "../Pages/AllProduct/ProductDetail";
import AllProducts from "../Pages/AllProduct/AllProduct";
import ProductDetail from "../Pages/AllProduct/ProductDetail";
import UserDetails from "../Pages/UserManagement/UserDetails";
import Brand from "../Pages/Brand/Brand";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/forgate-password",
    element: <ForgatePassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
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
            path: "/user-details",
            element: <UserDetails/>,
          },
          {
            path: "/transection-history",
            element: <TransectionHistory />,
          },
          {
            path: "/all-products",
            element: <AllProduct/>,
          },
              {
            path: "/brand",
            element: <Brand/>,
          },
          {
            path: "/product-detail/:categoryId",
            element: <ProductDetail/>,
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
            path: "/settings/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
