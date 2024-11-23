import React from "react";
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
import { Button } from "@/components/ui/button";

const SideBar = () => {
  return (
    <div className="hidden w-72 mt-14 flex-col border-r rounded p-6 md:flex">
      <div className="flex items-center gap-3 pb-6">
        {/* Avatar */}

        <nav className="flex flex-1 flex-col gap-2 ">
          <Button variant="ghost" className="justify-start font-primary font-semibold gap-2" asChild>
            <Link to="/profile/myProfile">
              <User className="h-4 w-4" />
              my profile
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start  font-primary font-semibold  gap-2" asChild>
          <Link to="/profile/orders">
              <Package className="h-4 w-4" />
              my orders
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-start  font-primary font-semibold  gap-2 "
            asChild
          >
            <Link to="/profile/myAddress">
              <MapPin className="h-4 w-4" />
              Delivery address
            </Link>
          </Button>
       
          <Button variant="ghost" className="justify-start  font-primary font-semibold  gap-2" asChild>
          <Link to="/profile/myResetPassword">
              <User className="h-4 w-4" />
              change password
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start  font-primary font-semibold  gap-2" asChild>
            <Link to="/profile/wallet">
              <Wallet className="h-4 w-4" />
              wallet
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start  font-primary font-semibold  gap-2" asChild>
            <Link to="/profile/coupons">
              <Ticket className="h-4 w-4" />
              Coupons
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
