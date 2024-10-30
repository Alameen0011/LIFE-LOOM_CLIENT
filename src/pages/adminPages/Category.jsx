import CategoryForm from "@/components/admin/CategoryForm"
import CategoryList from "@/components/admin/CategoryList"

const AddCategory = () => {
  return (
    <div className="container mx-auto  mt-10">
    {/* List of Categories */}
    <div className=" mx-auto max-w-4xl " >
      <CategoryList />
    </div>
  </div>
   




  )
}

export default AddCategory