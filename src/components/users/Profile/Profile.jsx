import {
  Heart,
  Home,
  MapPin,
  Package,
  Ticket,
  User,
  Wallet,
  KeyRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  console.log("insider user profile");
  return (
    <div>
      Hello
      <div className="flex min-h-screen max-w-3xl justify-center bg-background">
        {/* Sidebar */}
        <div className="hidden w-72 flex-col border-r bg-white p-6 md:flex">
          <div className="flex items-center gap-3 pb-6">
            <div className="h-12 w-12">profile</div>
            <span className="text-lg font-semibold">user_Name</span>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <User className="h-4 w-4" />
              my profile
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Package className="h-4 w-4" />
              my orders
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <MapPin className="h-4 w-4" />
              Delivery address
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Heart className="h-4 w-4" />
              my wishList
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all"
            >
              <KeyRound className="h-4 w-4" />
              change password
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Wallet className="h-4 w-4" />
              wallet
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Ticket className="h-4 w-4" />
              Coupons
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-900">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
            <span>/</span>
            <Link href="#" className="hover:text-gray-900">
              Accounts
            </Link>
            <span>/</span>
            <span className="text-gray-900">change password</span>
          </div>

          <div className="mx-auto max-w-md space-y-6 rounded-lg border p-6">
            <div className="text-center">
              <h2 className="text-lg font-medium">Update your password for</h2>
              <p className="text-sm text-gray-500">visguardi19@gmail.com</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  current password
                </label>
                <Input type="password" placeholder="Enter current password" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  new Password
                </label>
                <Input type="password" placeholder="Enter new password" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  confirm password
                </label>
                <Input type="password" placeholder="Confirm new password" />
              </div>

              <Button className="w-full bg-black text-white hover:bg-gray-800">
                update password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
