import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CheckCircle, Undo2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import {
  useCancelOrderMutation,
  useFetchOrderQuery,
  useHandleReturnRequestMutation,
  

} from "@/app/service/adminApiSlice";
import Pagination from "../users/Pagination";
import Modal from "./managementModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminReturnModal from "./AdminReturnModal";
import AdminLoading from "./adminLoading";



const OrderList = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedReturnRequest, setSelectedReturnRequest] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { data: orderData , isLoading } = useFetchOrderQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [cancelOrder, { data }] = useCancelOrderMutation();
  const [returnOrder] = useHandleReturnRequestMutation();
  // const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const navigate = useNavigate();

  const handleViewDetails = (orderId) => {
    console.log(orderId, "order id in view details click ");
    navigate(`/admin/orderDetails/${orderId}`);
  };

  const handleConfirmCancel = async () => {
    console.log(orderId, "order id");
    try {
      const res = await cancelOrder(orderId).unwrap();

      console.log(res, "response from cancel order");
      if (res.success) {
        toast.success("order cancelled successfully");
      }
    } catch (error) {
      console.log(error, "error while cancelling order");
      toast.error(error?.data?.message);
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    setCurrentPage(orderData?.page);
    setTotalPages(orderData?.totalPages);
  }, [orderData]);

  console.log(orderData, "order data coming from admin backend ");

  const hadReturnRequest = (order) => {
    return order.items.some(
      (item) =>
        item.returnRequest.isRequested && !item.returnRequest.isResponseSend
    );
  };
  const handleReturnRequest = (order) => {
    const returnReequestedItem = order.items.find(
      (item) =>
        item.returnRequest.isRequested && !item.returnRequest.isResponseSend
    );

    console.log(
      returnReequestedItem,
      " finding the conditionally applicable return resquest"
    );

    if (returnReequestedItem) {
      setSelectedReturnRequest(returnReequestedItem.returnRequest);
      setSelectedOrderId(order._id);
      setSelectedItemId(returnReequestedItem._id);
      setModalOpen(true);
    }
  };

  const handleApproveReturn = async () => {
    await handleReturnResponse(true);
  };

  const handleRejectReturn = async () => {
    await handleReturnResponse(false);
  };

  const handleReturnResponse = async (isApproved) => {
    try {
      const res = await returnOrder({
        orderId: selectedOrderId,
        itemId: selectedItemId,
        isApproved,
      }).unwrap();
      console.log(res, "response from returning order from admin");
      if (res.success ) {
        if(isApproved == true){

          toast.success("order Returned successfully");
        }else{
          toast.warn("order rejected")
        }
      }
    } catch (error) {
      console.log(error, "error while returning response");
    }finally{
      setModalOpen(false);
    }
  };


  if(isLoading){
    return <AdminLoading/>
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 font-primary">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/7 font-bold">Order ID</TableHead>
              <TableHead className="w-1/7 font-bold">Customer</TableHead>
              <TableHead className="w-1/5 font-bold">Date</TableHead>
              <TableHead className="w-1/5 font-bold">Return Request</TableHead>
              <TableHead className="w-1/7 font-bold">Total</TableHead>
              <TableHead className="w-1/5 font-bold">Payment</TableHead>
              <TableHead className="w-1/7 font-bold">view</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData?.orders?.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  <h1> No orders available</h1>
                </TableCell>
              </TableRow>
            ) : (
              orderData?.orders?.map((order, index) => (
                <TableRow
                  key={order._id}
                  className={index % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TableCell className="truncate">
                          {order?.user?.firstName}
                        </TableCell>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {order?.user?.firstName}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TableCell>
                    {new Date(order?.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReturnRequest(order)}
                      className={`flex items-center justify-center gap-2 mx-6 px-4 py-1 text-sm font-medium transition-colors duration-200 ease-in-out ${
                        hadReturnRequest(order)
                          ? "border-green-500 text-green-500 hover:bg-green-50"
                          : "border-red-500 text-red-500 hover:bg-red-50"
                      }`}
                    >
                      {hadReturnRequest(order) ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Undo2 size={20} />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>₹ {order.totalAmount}</TableCell>
                  <TableCell>{order.paymentDetails.status}</TableCell>

                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(order._id)}
                            className=" hover:text-red-700 max-w-9 " // Add width and height
                          >
                            View Details
                            <span className="sr-only">See Order Details</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>See Order Details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 0}
        paginate={paginate}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmCancel} 
        title="Cancel Order"
        message={`Are you sure you want to cancel order?`}
      />

      <AdminReturnModal
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
        returnRequest={selectedReturnRequest}
        onApprove={handleApproveReturn}
        onReject={handleRejectReturn}
      />
    </div>
  );
};

export default OrderList;
