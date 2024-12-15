import React, { useState } from "react";
import {
  Heart,
  Home,
  MapPin,
  Package,
  Ticket,
  User,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button (Visible only on small devices) */}
      <Button
        variant="ghost"
        className="fixed top-16 right-4 z-10 md:hidden"
        onClick={toggleSidebar}
      >
        <HamburgerMenuIcon className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-72 mt-14 flex-col border-r rounded p-6 md:flex md fixed md:static bg-white z-40 md:z-auto`}
      >
        <div className="flex items-center gap-3 pb-6">
          {/* Avatar Placeholder */}
          <nav className="flex flex-1 flex-col gap-2">
            <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
              <Link to="/profile/myProfile">
                <User className="h-4 w-4" />
                my profile
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
              <Link to="/profile/orders">
                <Package className="h-4 w-4" />
                my orders
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
              <Link to="/profile/myAddress">
                <MapPin className="h-4 w-4" />
                Delivery address
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
              <Link to="/profile/myResetPassword">
                <User className="h-4 w-4" />
                change password
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
              <Link to="/profile/wallet">
                <Wallet className="h-4 w-4" />
                wallet
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
              <Link to="/profile/coupons">
                <Ticket className="h-4 w-4" />
                Coupons
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
              <Link to="/profile/refferal">
                <Ticket className="h-4 w-4" />
                Refferal
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* Overlay to close sidebar on small devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SideBar;

