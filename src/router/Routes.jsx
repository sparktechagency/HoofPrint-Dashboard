import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import AddProductByAdmin from "../Pages/AddProductByAdmin/AddProductByAdmin";
import ProfilePage from "../Pages/AdminProfile/ProfilePage";
import AllProduct from "../Pages/AllProduct/AllProduct";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import UpdatePassword from "../Pages/Auth/UpdatePassword/UpdatePassword";
import VerifyCode from "../Pages/Auth/VerifyCode/VerifyCode";
import Brand from "../Pages/Brand/Brand";
import Category from "../Pages/Category/Category";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ProductPurchase from "../Pages/ProductPurchase/ProductPurchase";
import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
import TransectionHistory from "../Pages/TransectionHistory/TransectionHistory";
import UserDetails from "../Pages/UserManagement/UserDetails";
import UserManagement from "../Pages/UserManagement/UserManagement";
import UserProductsPage from "../Pages/UserManagement/UserProductsPage";
import PrivateRoute from "./PrivateRoute";
import GetPrivacyPolicy from "../Pages/Settings/PrivacyPolicy/GetPrivacyPolicy";
import GetTermsCondition from "../Pages/Settings/TermsCondition/GetTermsCondition";
import Color from "../Pages/Color/Color";

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
    path: "/privacy-policy",
    element: <GetPrivacyPolicy />,
  },
  {
    path: "/terms-condition",
    element: <GetTermsCondition />,
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
            path: "/users/:id/products",
            element: <UserProductsPage />,
          },
          {
            path: "/user-details",
            element: <UserDetails />,
          },
          {
            path: "/transection-history",
            element: <TransectionHistory />,
          },
          {
            path: "/product-purchase",
            element: <ProductPurchase />,
          },
          {
            path: "/add-admin-product",
            element: <AddProductByAdmin />,
          },
          {
            path: "/all-products",
            element: <AllProduct />,
          },
          {
            path: "/brand",
            element: <Brand />,
          },
          {
            path: "/color",
            element: <Color />,
          },
          {
            path: "/category",
            element: <Category />,
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
