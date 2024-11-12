import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useAdminOrderCancelMutation,
  useFetchSingleOrderQuery,
} from "@/app/service/adminApiSlice";
import Modal from "./managementModal";
import { toast } from "react-toastify";

const AdminOrderDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [itemId, setItemId] = useState(null);

  const { id } = useParams();

  console.log(id, "id from useparams for single admin order details fetching");

  const { data } = useFetchSingleOrderQuery(id);
  const [orderCancel] = useAdminOrderCancelMutation();

  const handleCancelOrderRequest = (orderId, itemId) => {
    console.log(orderId, itemId, "clicked on button for cancel ");
    setOrderId(orderId);
    setItemId(itemId);

    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    console.log(orderId, itemId, "order id,itemId");
    try {
      const res = await orderCancel({ orderId, itemId }).unwrap();

      console.log(res, "response from cancel order");
      if (res.success) {
        toast.success("order cancelled successfully");
      }
    } catch (error) {
      console.log(error, "error while cancelling order");
      toast.error("please retry again some issue has arisen");
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data, "data from admin fething order");
    }
  }, [data]);

  return (
    <div className="container mx-auto max-w-3xl m-10 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Welcome!</span>
          <span className="font-medium">{data?.order?.user?.firstName}</span>
         
        </div>
        <h1 className="text-2xl font-bold font-primary">Order Details</h1>
      </div>

      <div className="flex justify-between items-center bg-muted/50  rounded-lg">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
           orderId: {data?.order?._id}
          </p>
          <p className="text-sm text-muted-foreground">
            Delivery By December, 2024
          </p>
        </div>
        {/* <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Invoice
      </Button> */}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-primary">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{data?.order?.user?.firstName}</p>
            <p className="text-sm text-muted-foreground">
              {data?.order?.shippingDetails?.state}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.order?.shippingDetails?.address}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.order?.shippingDetails?.district}
            </p>
            <p className="text-sm text-muted-foreground">
              {data?.order?.shippingDetails?.city}
            </p>

            <p className="text-sm text-muted-foreground">
              Contact: +1 (555) 123-4567
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-primary">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>{data?.order?.paymentDetails?.method}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {data?.order?.paymentDetails?.status}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-primary">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items Total</span>
              <span>{data?.order?.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600">0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₹0.00</span>
            </div>
            {/* <Separator className="my-2" /> */}
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{data?.order?.totalAmount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.order?.items?.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-start gap-6 p-4 border rounded-lg"
            >
              <div className="w-12 h-12 relative">
                <img
                  src={item?.product?.images[0]}
                  alt={item?.product?.productName}
                  // fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {item?.product?.productName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item?.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item?.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item?.price}</p>
                    <p className="text-sm text-green-600">15% off</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                    Status: {item?.status}
                  </span>
                  {item.status !== "Cancelled"  ? (
                    <Button
                      onClick={() =>
                        handleCancelOrderRequest(data?.order?._id, item?._id)
                      }
                      variant="destructive"
                      size="sm"
                    >
                      Cancel Order
                    </Button>
                  ) : (
                    <Button variant="destructive" size="sm">
                      Cancelled !
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Modal
        title="Are you sure you want to cancel this order?"
        message="This action cannot be undone."
        isOpen={showModal}
        onConfirm={handleConfirmCancel}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default AdminOrderDetails;
