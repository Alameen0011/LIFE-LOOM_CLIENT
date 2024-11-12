import {
  useGetOrderQuery,
  useOrderCancelMutation,
} from "@/app/service/orderApiSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Package, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/components/admin/managementModal";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const itemsPerPage = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { data: orders } = useGetOrderQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [orderCancel, { data }] = useOrderCancelMutation();

  console.log(orders, "orders");

  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelRequest = (orderId, itemId) => {
    setCurrentItemId(itemId);
    setCurrentOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    try {
      console.log(currentItemId, currentOrderId, "++++item id , order id");

      const res = await orderCancel({
        orderId: currentOrderId,
        itemId: currentItemId,
      }).unwrap();
      if (res.success) {
        toast.success("order cancelled successfully");
      }
    } catch (error) {
      console.log(error, "error while cancelling order");
      toast.error("error while cancelling order ");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    console.log("close modal");
    setIsModalOpen(false);
  };

  const handleViewDetails = (orderId) => {
    console.log(orderId, "order id in view details click ");
    navigate(`/profile/order/${orderId}`);
  };

  useEffect(() => {
    setCurrentPage(orders?.page);
    setTotalPages(orders?.totalPages);
  }, [orders]);

  return (
    <div className="flex-1 p-6">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="#" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="#" className="hover:text-foreground">
          Accounts
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Delivery address</span>
      </div>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Order History
          </h1>
          <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-1">
            {orders?.orders?.map((order) => (
              <div
                key={order?._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-primary">
                      Order ID: {order?._id}
                    </p>
                    <p className="text-sm mt-2 font-semibold font-primary">
                      {new Date(order?.createdAt).toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      
                      })}
                    </p>
                  </div>
                </div>
                <ul className="mb-4 space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between text-sm font-primary"
                    >
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          {item.product.productName} - (x{item.quantity}) - ₹
                          {item.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                        {item.status.toLowerCase() !== "cancelled" &&
                          item.status.toLowerCase() !== "delivered" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="text-sm"
                              onClick={() =>
                                handleCancelRequest(order._id, item._id)
                              }
                            >
                              Cancel
                              <X className="h-4 w-4 ml-1" />
                            </Button>
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center font-primary">
                  <p className="font-bold">
                    Total: ₹{order?.totalAmount?.toFixed(2)}
                  </p>
                  <div className="space-x-2">
                    <Button
                      onClick={() => handleViewDetails(order._id)}
                      variant="outline"
                      size="sm"
                      className="text-sm"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 0}
        paginate={paginate}
      />

      <Modal
        title="Are you sure you want to cancel this order?"
        message="This action cannot be undone."
        isOpen={isModalOpen}
        onConfirm={handleConfirmCancel}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OrderHistory;
