import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCopy } from "lucide-react";
import { useFetchUserCouponQuery } from "@/app/service/userApiSlice";
import { toast } from "react-toastify";

const Coupon = () => {
 

  const { data: CouponsData } = useFetchUserCouponQuery();

  useEffect(() => {
    if (CouponsData) {
      console.log(CouponsData.coupons);

      console.log(CouponsData.coupons.length > 0);
    }
  }, [CouponsData]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("copied successfully");
    });
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 font-primary rounded">
      <h1 className="text-xl font-primary font-semibold mb-6  text-gray-800">
        Available Coupons
      </h1>
      {CouponsData?.coupons?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CouponsData?.coupons?.map((coupon, index) => (
            <Card
              key={index}
              className="rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-md font-bold uppercase text-gray-800 mb-2">
                      {coupon.code}
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                      {coupon.description}
                    </p>
                    <p className="text-2xl font-extrabold text-green-600 mb-3">
                     Disount: {coupon.discountValue}%
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Min. purchase: {coupon.minPurchaseAmount}</span>
                      <span>
                        Expires:{" "}
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(coupon.code)}
                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <ClipboardCopy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No coupons available at the moment. Check back later!
        </p>
      )}
    </div>
  );
};

export default Coupon;
