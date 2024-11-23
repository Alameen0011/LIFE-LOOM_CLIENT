import React, { useState } from 'react'
import { Button } from '../ui/button'
import { PlusCircle, Trash2Icon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useNavigate } from 'react-router-dom'
import { useDeleteCouponMutation, useGetCouponQuery } from '@/app/service/adminApiSlice'
import { toast } from 'react-toastify'
import Modal from './managementModal'

const CouponList = () => {

    const [coupon,setCoupon] = useState()
    const [isModalOpen,setIsModalOpen] = useState(false)
      const {data:couponData} = useGetCouponQuery()
      const [deleteCoupon] = useDeleteCouponMutation()
    
      const navigate = useNavigate()

      const handleDeleteRequest = (couponId) => {
        setCoupon(couponId)
        setIsModalOpen(true)
      }



      const handleDelete = async() => {

        console.log(coupon,"coupn")
        try {
          const res = await deleteCoupon({id:coupon}).unwrap()
          console.log(res,"response from deletion of coupon")
          if(res.success){
            toast.success("coupon deleted successfully")
          }
          
        } catch (error) {
          console.log("error while deleting coupon",error)
          toast.error("error while deleting Coupon")
          
        }finally{
          setIsModalOpen(false)
        }
      }
    
      const handleAddCoupon = () => {
 
        console.log('Add coupon clicked')
        navigate("/admin/addCoupon")
        
      }
    




  return (
    <div className="container mx-auto max-w-4xl p-4 mt-10 sm:p-6 lg:p-8  font-primary">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-primary">Coupon Management</h1>
      <Button onClick={handleAddCoupon} className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Coupon
      </Button>
    </div>
    <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center  font-bold px-4 py-2">Coupon Code</TableHead>
            <TableHead className="text-center font-bold px-4 py-2">Discount</TableHead>
            <TableHead className="text-center font-bold px-4 py-2">Expiry Date</TableHead>
            <TableHead className="text-center font-bold px-4 py-2">Status</TableHead>
            <TableHead className="text-center font-bold px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {couponData?.coupons.map((coupon, index) => (
            <TableRow key={coupon._id} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
              <TableCell  className="text-center px-4 py-2 font-medium">{coupon.code}</TableCell>
              <TableCell   className="text-center px-4 py-2 font-medium" >{coupon.discountValue}%</TableCell>
              <TableCell   className="text-center px-4 py-2 font-medium" > {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString('en-US') : ""}</TableCell>
              <TableCell  className="text-center px-4 py-2 font-medium">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coupon.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {coupon.status}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteRequest(coupon._id)}
                  className="hover:bg-destructive/90"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <Modal
    isOpen={isModalOpen}
    onConfirm={handleDelete}
    onClose={() => setIsModalOpen(false)}
    
    
    
    
    />



  </div>
  )
}

export default CouponList