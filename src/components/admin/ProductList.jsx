import  { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  useFetchProductsQuery,
  useSoftDeleteProductMutation,
} from "@/app/service/adminApiSlice";
import { toast } from "react-toastify";
import Pagination from "../users/Pagination";
import AdminLoading from "./AdminLoading";

const ProductList = () => {
  const navigate = useNavigate();

  //-------------------Pagination------------------//
  const itemsPerPage = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { data, error, isLoading } = useFetchProductsQuery({ page: currentPage,  limit: itemsPerPage});
  const [productSoftDelete] = useSoftDeleteProductMutation();


  console.log(data, "hello");

  const handleSoftDelete = async (productId) => {
    console.log("going to soft delele");
    try {
      const res = await productSoftDelete(productId).unwrap();
      console.log(res,"response from softDeleting api")
      if (res.success) {
        toast.success("successfully softly deleted ");
      }
    } catch (error) {
      console.log(error,"error while deleting product")
      toast.error(error?.data?.message)
    }
  };

  const handleEditProduct = (productId) => {
    console.log("going to edit product", productId);
    navigate(`/admin/products/edit/${productId}`);
  };
  console.log(currentPage, "current page");
  console.log(totalPages, "totoal pages");

  useEffect(() => {
    setCurrentPage(data?.page);
    setTotalPages(data?.totalPages);
  }, [data]);

  if (error) console.log("Error:", error);
  
  if (isLoading) {
    return <AdminLoading/>
  }


  return (
    <div className="container max-w-3xl mx-auto py-10 font-primary">
      <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
        </div>
        <Button onClick={() => navigate("/admin/addProduct")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">Image</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-center font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell >
                  <img
                    src={product.images[1]}
                    alt={product.productName}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {product.productName} 
                </TableCell>
                <TableCell>{product?.category?.categoryName}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status
                        ? "bg-green-100 text-green-800"
                        : product.status
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status ? "Active" : "inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleEditProduct(product._id)}
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleSoftDelete(product._id)}
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 0}
        paginate={paginate}
      />
    </div>
  );
};

export default ProductList;
