import EditProductForm from '@/components/admin/EditProductForm'
import React from 'react'
import { useParams } from 'react-router-dom'

const EditProduct = () => {
    console.log("inside edit product page")

    const {productId} = useParams()

    console.log(productId)
  return (

    <div>
    <EditProductForm/>

  
  
      
  </div>
    


  )
}

export default EditProduct