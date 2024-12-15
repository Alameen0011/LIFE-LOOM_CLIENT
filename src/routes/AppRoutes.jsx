import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import AuthLayout from "@/layouts/AuthLayout";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import MainLayout from "@/layouts/MainLayout";
import NotFoundPage from "@/pages/NotFoundPage";
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
import CartPage from "@/pages/UserPages/Cart";
import CheckoutPage from "@/pages/UserPages/CheckoutPage";
import OrderSuccess from "@/pages/UserPages/OrderSuccess";
import MyOrder from "@/components/users/order/MyOrder";
import Order from "@/pages/adminPages/Order";
import AuthWrapper from "./ProtectedRoutes/AuthWrapper";
import OrderDetails from "@/components/users/order/OrderDetails";
import AdminOrderDetails from "@/components/admin/AdminOrderDetails";
import Offer from "@/pages/adminPages/Offer";
import AddOffer from "@/pages/adminPages/AddOffer";
import Coupon from "@/pages/adminPages/Coupon";
import AddCoupon from "@/components/admin/AddCoupon";
import MyWallet from "@/components/users/Profile/MyWallet";
import RequireAdminAuth from "./ProtectedRoutes/RequireAdminAuth";
import MyCoupon from "@/pages/UserPages/MyCoupon";
import ForgotOtp from "@/pages/ForgotOtp";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import SalesReport from "@/components/admin/SalesReport";
import RefferalPage from "@/pages/UserPages/RefferalPage";
import AboutUs from "@/pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <Shop /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/about", element: <AboutUs /> },
      { path: "*", element: <NotFoundPage /> },
      {
        path: "/cart",
        element: <RequireUserAuth />,
        children: [{ path: "", element: <CartPage /> }],
      },
      {
        path: "/wishlist",
        element: <RequireUserAuth />, 
        children: [{ path: "", element: <WhishlistPage /> }],
      },
      {
        path: "/profile",
        element: <RequireUserAuth />,
        children: [
          { path: "orders", element: <MyOrder /> },
          { path: "myProfile", element: <MyProfile /> },
          { path: "order/:id", element: <OrderDetails /> },
          { path: "myAddress", element: <MyAddress /> },
          { path: "addAddress", element: <MyNewAddress /> },
          { path: "myResetPassword", element: <MyResetPassword /> },
          { path: "editProfile/:id", element: <MyEditAddress /> },
          { path: "wallet", element: <MyWallet /> },
          { path: "coupons", element: <MyCoupon /> },
          { path: "refferal", element: <RefferalPage /> }
        ],
      },
      {
        path: "/order",
        element: <RequireUserAuth />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "confirmation", element: <OrderSuccess /> },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "sendotp", element: <OtpPage /> },
          { path: "forgotOtp", element: <ForgotOtp /> },
          { path: "updatePassword", element: <ResetPasswordPage /> },
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
    element: <RequireAdminAuth />,

    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "customers", element: <UserManagement /> },
          { path: "products", element: <ProductList /> },
          { path: "addProduct", element: <AddProduct /> },
          { path: "products/edit/:productId", element: <EditProduct /> },
          { path: "categories", element: <AddCategory /> },
          { path: "addCategory", element: <CategoryForm /> },
          { path: "orders", element: <Order /> },
          { path: "offers", element: <Offer /> },
          { path: "addOffer", element: <AddOffer /> },
          { path: "orderDetails/:id", element: <AdminOrderDetails /> },
          { path: "coupons", element: <Coupon /> },
          { path: "addCoupon", element: <AddCoupon /> },
          { path: "sales", element: <SalesReport /> },
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
