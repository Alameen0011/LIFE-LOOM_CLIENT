import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/authLayout";
import SignupPage from "../pages/signupPage";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminLoginPage from "@/pages/adminPages/AdminLoginPage";
import OtpPage from "@/pages/OtpPage";
import WhishlistPage from "@/pages/WhishlistPage";
import Dashboard from "@/pages/adminPages/Dashboard";
import UserManagement from "@/pages/adminPages/UserManagement";
import AddProduct from "@/pages/adminPages/AddProduct";
import AddCategory from "@/pages/adminPages/Category";
import RequireUserAuth from "./ProtectedRoutes/RequireUserAuth";
import CategoryForm from "@/components/admin/CategoryForm";
import ProductList from "@/components/admin/ProductList";
import EditProduct from "@/pages/adminPages/EditProduct";
import HomePage from "@/pages/UserPages/HomePage";
import ProductDetails from "@/pages/UserPages/ProductDetails";
import Shop from "@/pages/UserPages/Shop";
import RedirectAuthenticatedAdmin from "./ProtectedRoutes/RedirectAuthenticateAdmin";
import MyProfile from "@/components/users/Profile/MyProfile";
import MyAddress from "@/components/users/Profile/MyAddress";
import MyNewAddress from "@/components/users/Profile/MyNewAddress";
import MyResetPassword from "@/components/users/Profile/MyResetPassword";
import MyEditAddress from "@/components/users/Profile/MyEditAddress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },

      { path: "/products", element: <Shop /> },
      { path: "/products/:id", element: <ProductDetails /> },
      {path:"/cart", element:<Cart/>}
      { path: "*", element: <NotFoundPage /> },
      {
        path: "/wishlist",
        element: <RequireUserAuth />, // Protected route
        children: [
          { path: "", element: <WhishlistPage /> }, // Child route
        ],
      },
      {
        path: "/profile",
        element: <RequireUserAuth />, // Protected route
        children: [
          { path: "myProfile", element: <MyProfile /> }, // Child route
          { path: "myAddress", element: <MyAddress /> }, // Child route
          { path: "addAddress", element: <MyNewAddress /> }, // Child route
          { path: "myResetPassword", element: <MyResetPassword /> }, // Child route
          { path: "editProfile/:id", element: <MyEditAddress /> }, // Child route
        ],
      },
      {
        path:"/order",
        element:<RequireUserAuth/>,
        children: [
     
        ]
      }
    ],
  },
  {
    path: "/auth",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "sendotp", element: <OtpPage /> },
        ],
      },
    ],
  },

  //Admin - Routes

  {
    path: "admin",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={"/admin/login"} replace />,
      },

      {
        path: "login",
        children: [
          {
            path: "",
            element: (
              <RedirectAuthenticatedAdmin>
                <AdminLoginPage />
              </RedirectAuthenticatedAdmin>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,

    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "customers", element: <UserManagement /> },
          { path: "products", element: <ProductList /> },
          { path: "addProduct", element: <AddProduct /> },
          { path: "products/edit/:productId", element: <EditProduct /> },
          { path: "categories", element: <AddCategory /> },
          { path: "addCategory", element: <CategoryForm /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
