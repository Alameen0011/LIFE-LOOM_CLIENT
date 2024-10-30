import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import { useFetchProductsQuery, useSoftDeleteProductMutation } from '@/app/service/adminApiSlice'
import { toast } from 'react-toastify'




const ProductList = () => {
    const navigate = useNavigate()

    const {data,error,isLoading} = useFetchProductsQuery()
    const [productSoftDelete] = useSoftDeleteProductMutation()

    if (isLoading) console.log("Loading...");
     if (error) console.log("Error:", error);


    console.log(data,"hello")

    const handleSoftDelete = async(productId) => {
      console.log("going to soft delele")
  

      const res = await productSoftDelete(productId)

      console.log(res)

      toast.success("deleted successfully")

    }

    const handleEditProduct = (productId) => {
      console.log("going to edit product",productId)
      navigate(`/admin/products/edit/${productId}`)
    }




  return (
    <div className="container max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products" className="pl-8" />
        </div>
        <Button onClick = {() => navigate('/admin/addProduct')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.images[1]}
                    alt={product.productName}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.productName}</TableCell>
                <TableCell>{product.category.categoryName}</TableCell>
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
                  <Button onClick = {() => handleEditProduct(product._id)}    variant="ghost" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleSoftDelete(product._id)} variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductList