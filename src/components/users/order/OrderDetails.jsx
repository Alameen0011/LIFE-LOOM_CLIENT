import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useGetSingleOrderQuery,
  useOrderCancelMutation,
} from "@/app/service/orderApiSlice";
import { useState } from "react";
import Modal from "@/components/admin/managementModal";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";
import { useLazyGetInvoiceDataQuery } from "@/app/service/userApiSlice";
import { saveAs } from "file-saver";
import UserLoading from "@/components/UserLoading";


const OrderDetails = () => {

  
  const { id } = useParams();

  console.log(id, "id from useparams for single order details fetching");

  const [triggerInvoiceDownload] = useLazyGetInvoiceDataQuery()

  const [orderCancel] = useOrderCancelMutation();


  const handleInvoiceDownload = async () => {
    try {
      console.log(id,"order id while cliking ")

      const res = await triggerInvoiceDownload({orderId:id}).unwrap()

      console.log(res)

      const blob = new Blob([res],{ type: "application/pdf"   })
     

      saveAs(blob,"invoice.pdf")
      toast.success("invoice downloaded successfully")
      
    } catch (error) {
      console.log(error,"error while downllading invoice")
      toast.error("please try again later")
    }
  }

  const handleConfirmCancel = async (orderId, itemId) => {
    try {
      const res = await orderCancel({ orderId, itemId }).unwrap();

      console.log(res, "response from cancel order");
      if (res.success) {
        toast.success("order cancelled successfully");
      }
    } catch (error) {
      console.log(error, "error while cancelling order");
      toast.error("please retry again some issue has arisen");
    } 
  };




  const { data, isLoading: singleDataLoading } = useGetSingleOrderQuery(id);

  console.log(data, "data from single order fetching");

  if (singleDataLoading) {
    return <UserLoading/>
  }

  return (
    <div className="container mx-auto max-w-2xl m-10 space-y-6">
      <div className="flex justify-between items-center font-primary">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Welcome!</span>
          <span className="font-medium">{data?.order?.user?.firstName}</span>
        </div>
        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg font-primary">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Order: {data?.order?._id}
          </p>
          <p className="text-sm mt-2 font-semibold font-primary">
            {new Date(data?.order?.createdAt).toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>

        
        <Button onClick= {() => handleInvoiceDownload()} variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Invoice
      </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 font-primary">
        <Card>
          <CardHeader>
            <CardTitle className="">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">{data?.order?.user?.firstName}</p>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="">Payment Method</CardTitle>
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
            <CardTitle className="">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Items Total</span>
              <span>₹{data?.order?.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                saved Amount
              </span>
              <span className="text-green-600 text-sm">
                ₹{data?.order?.savedAmount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Items price</span>
              <span className="text-sm">₹{data?.order?.actualAmount}</span>
            </div>
            {/* <Separator className="my-2" /> */}
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-sm">{data?.order?.totalAmount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-primary">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.order?.items?.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-start gap-6 p-4 border rounded-lg font-primary"
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
                    <h3 className="text-sm">{item?.product?.productName}</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Quantity: {item?.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
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
                  {item.status === "Delivered" ? (
                    <Button variant="destructive" size="sm">
                      Delivered!
                    </Button>
                  ) : item.status !== "Cancelled" ? (
                    <Button
                      onClick={() =>
                        handleConfirmCancel(data?.order?._id, item?._id)
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
    </div>
  );
};

export default OrderDetails;
