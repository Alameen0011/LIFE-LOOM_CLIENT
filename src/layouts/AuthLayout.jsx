import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col" >
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>

    <Footer />
  </div>
  );
};

export default AuthLayout;
