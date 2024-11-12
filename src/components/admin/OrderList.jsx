import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  useCancelOrderMutation,
  useFetchOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/app/service/adminApiSlice";
import Pagination from "../users/Pagination";
import Modal from "./managementModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const statusOrder = ["Processing", "Shipped", "Delivered", "Cancelled"];

const OrderList = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { data: orderData } = useFetchOrderQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [cancelOrder, { data }] = useCancelOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const navigate = useNavigate();

  const handleCancelOrderRequest = (orderId) => {
    console.log(orderId);
    setOrderId(orderId);

    setShowModal(true);
  };

  const handleViewDetails = (orderId) => {
    console.log(orderId, "order id in view details click ");
    navigate(`/admin/orderDetails/${orderId}`);
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await updateOrderStatus({ orderId, status }).unwrap();

      if (res.success) {
        toast.success("order status changed successfully");
      }
    } catch (error) {
      console.log(error, "error while updating order status");
      toast.error(error.data.message);
    }
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

  return (
    <div className="container max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/7">Order ID</TableHead>
              <TableHead className="w-1/7">Customer</TableHead>
              <TableHead className="w-1/7">Date</TableHead>
              <TableHead className="w-1/5">Status</TableHead>
              <TableHead className="w-1/7">Total</TableHead>
              <TableHead className="w-1/7">Payment</TableHead>
              <TableHead className="w-1/7">Actions</TableHead>
              <TableHead className="w-1/7">view</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData?.orders?.length == 0 ? (
              <TableRow>
                <TableCell
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No orders available. HEllo
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start`}
                        >
                          {order.status}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {statusOrder.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() =>
                              handleStatusChange(order._id, status)
                            }
                          >
                            {order.status === status && (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                            <span>{status}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.paymentDetails.status}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCancelOrderRequest(order._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Cancel Order</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cancel Order</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
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
      {
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || 0}
          paginate={paginate}
        />
      }
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)} // Close modal when clicked cancel
        onConfirm={handleConfirmCancel} // Block user when confirmed
        title="Cancel Order"
        message={`Are you sure you want to cancel order?`}
      />
    </div>
  );
};

export default OrderList;
