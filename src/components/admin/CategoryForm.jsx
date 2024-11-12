import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addCategorySchema } from "@/validationSchemas/addCategory"
import { useAddCategoryMutation, useFetchCategoriesQuery } from "@/app/service/adminApiSlice"
import { toast } from "react-toastify"
import {  useNavigate } from "react-router-dom"
const CategoryForm = () => {
    const navigate = useNavigate()
    const { register,handleSubmit, formState:{errors}  } =useForm({ resolver:zodResolver(addCategorySchema)  })
     const [addCategory,{data:addCategoryData}] = useAddCategoryMutation()
     const {data:existingCategoryData} = useFetchCategoriesQuery({page:1,limit:4})

    
    const onSubmit = async(data) => {
      console.log(data,"data on submission face");

      const duplicate = existingCategoryData.categories.some((category) => category.categoryName.trim().toLowerCase() === data.categoryName.trim().toLowerCase());


    if (duplicate) {
      toast.error('Category name already exists. Please choose a different name.');
      return;
    }






      try {
        
        const res = await addCategory(data).unwrap()
        console.log(res)
        console.log(addCategoryData)
        toast.success(res?.message)
        navigate('/admin/categories',{replace:true})
        
      } catch (error) {
        console.log(error,"Error while adding category")
        toast.error(error?.data?.message)

        
      }


        
        // Here you can handle the data submission, e.g., send it to your API
      };



  return (
    <div className="max-w-sm rounded mx-auto mt-10">
    <h2 className="text-2xl font-primary font-semibold text-center text-gray-800 mb-6">Add Category</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 mb-4">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2 font-primary" htmlFor="categoryName">
          Category Name
        </label>
        <input
          {...register('categoryName')}
          className={`shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black font-primary ${
            errors.categoryName ? 'border-red-500' : 'border-gray-300'
          }`}
          type="text"
          id="categoryName"
          placeholder="Enter category name"
        />
        {errors.categoryName && (
          <p className="text-red-500 text-xs font-primary   mt-1">{errors.categoryName.message}</p>
        )}
      </div>
  
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          {...register('description')}
          className={`shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black font-primary ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          id="description"
          placeholder="Enter description"
          rows="4"
        />
        {errors.description && (
          <p className="text-red-500 text-xs font-primary mt-1">{errors.description.message}</p>
        )}
      </div>
  
      <div className="flex items-center justify-between">
        <button
          className="bg-black hover:bg-black text-white font-primary font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
          type="submit"
        >
          Add Category
        </button>
      </div>
    </form>
  </div>
  )
}

export default CategoryForm