import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema } from '@/validationSchemas/addCategory';

const EditCategoryModal = ({category,isOpen,onClose,onSave}) => {

    const {register,handleSubmit, formState: { errors }} = useForm({resolver:zodResolver(addCategorySchema)})

    const onSubmit = (data) => {
        onSave({ ...category, ...data });
      };

      if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white max-w-sm p-6 rounded shadow-lg w-1/3">
      <h2 className="text-xl font-semibold mb-4 font-primary">Edit Category</h2>
  
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Category Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 font-primary">Category Name</label>
          <input
            type="text"
            {...register("categoryName")}
            className={`mt-1 block w-full px-3 py-2 border ${errors.categoryName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-primary`}
          />
          {errors.categoryName && (
            <p className="text-red-600 text-sm mt-1 font-primary">{errors.categoryName.message}</p>
          )}
        </div>
  
        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 font-primary">Description</label>
          <textarea
            {...register("description")}
            className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-primary`}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1 font-primary">{errors.description.message}</p>
          )}
        </div>
  
        {/* Modal Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded font-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black hover:bg-black text-white px-4 py-2 rounded font-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditCategoryModal