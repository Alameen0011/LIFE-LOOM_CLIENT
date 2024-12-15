import {
  useFetchCategoriesQuery,
  useFetchProductsQuery,
  useSoftDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
} from "@/app/service/adminApiSlice";
import { Edit, PlusCircle, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import { useNavigate } from "react-router-dom";
import ConfirmActionModal from "./ConfirmActionModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import Pagination from "../users/Pagination";
import AdminLoading from "./adminLoading";

const CategoryList = () => {




  //---------pagination --------------//

  const itemsPerPage = 4
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const { data,isLoading } = useFetchCategoriesQuery({page:currentPage,limit:itemsPerPage});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // Manage confirm modal
  const [actionType,setActionType] = useState(null)
  const [categoryToDeactivate, setCategoryToDeactivate] = useState(null);
  const navigate = useNavigate();



  const [updateCategoryStatus] = useUpdateCategoryStatusMutation();
  const [softDeleteCategory] = useSoftDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()


  console.log(data);

  const handleEdit = (category) => {
    console.log(`Edit category with ID: ${category}`);
    console.log("EDIT category", category);
    setSelectedCategory(category); // Set the category to be edited
    setModalOpen(true); // Open the modal

  };

  const handleModalClose = (reset) => {
    setModalOpen(false);
    setSelectedCategory(null);
    reset()
  };

  const handleDelete = (category) => {
    console.log(`Delete category ${category}`);
    // Handle delete action (e.g., show a confirmation dialog)

    setCategoryToDeactivate(category);
    setActionType("delete")
    setConfirmModalOpen(true);



  };

  const handleModalSave = async(updatedCategory) => {
    console.log("Updated category:", updatedCategory);
    // Close the modal after saving
    try {
      const res = await updateCategory(updatedCategory).unwrap()
      console.log(res,"response from editing category")
    
      toast.success("category edited successFully")
      
    } catch (error) {
      console.log(error,"error whiel updating category ")
      toast.error(error?.data?.message)
      
    }finally{
      setModalOpen(false);

    }


    // reset()
  };

  const handleToggleStatus = async (category) => {
    if (category.status) {
      // If status is Active (trying to block), show the confirmation modal
      setActionType("block"); 
      setCategoryToDeactivate(category);
      setConfirmModalOpen(true);
    } else {
      // If status is Inactive (trying to unblock), directly call API to activate
      const res = await updateCategoryStatus({ categoryId: category._id });

      console.log(res);
      toast.success("category unblocked successfully")
    }
  };

  console.log(actionType,"Action type when click block")

  const handleConfirmDeactivate = async () => {
    if (categoryToDeactivate) {
      if (actionType === "delete") {
      const res =  await softDeleteCategory(  categoryToDeactivate._id );
      console.log(res,"response from deletion of category ")
      toast.success("category deleted succeessFully")
      } else if (actionType === "block") {
       const res =  await updateCategoryStatus({ categoryId: categoryToDeactivate._id });
       console.log(res,"response from updation of category status")
       if(res) 
        toast.success("category blocked successFully")
   
      }
      setConfirmModalOpen(false);
      setCategoryToDeactivate(null);
    }
  };

  
  useEffect(() => {

    setCurrentPage(data?.page)
    setTotalPages(data?.totalPages)

  },[data])


  if(isLoading){
    return <AdminLoading/>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold font-primary mb-4">Category List</h2>
    
      {/* Add Category Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products" className="pl-8" />
        </div>
        <Button onClick={() => navigate("/admin/addCategory")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>

      

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Status
              </th>
              <th className="px-6 py-3 text-right pr-10 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.categories?.map((category) => (
              <tr
                key={category._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {category.categoryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      category.status
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {category.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-4 justify-end">
                     {/* Toggle Status Button */}
                     <button
                    onClick={() => handleToggleStatus(category)}
                    className={`w-28 py-2 rounded-full text-white text-sm font-medium ${
                      category.status
                        ? "bg-black text-white"
                        : "bg-black text-white"
                    } transition duration-150`}
                  >
                    {category.status ? "Block" : "unblock"}
                  </button>
                  {/* Edit Button */}
                 
                  <Button     onClick={() => handleEdit(category)} variant="ghost" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>

               

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(category)}
                    className="text-red-500 hover:text-red-700 transition duration-150"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 0}
        paginate={paginate}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />

      {/* Confirm Deactivation Modal */}
      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        category={categoryToDeactivate}
        actionType={actionType}
      />
    </div>
  );
};

export default CategoryList;
