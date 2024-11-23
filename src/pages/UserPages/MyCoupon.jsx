import Coupon from '@/components/users/Profile/Coupon'
import SideBar from '@/components/users/Profile/SideBar'



const MyCoupon = () => {
  return (
    <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
    {/* Sidebar */}
    <SideBar />

    {/* Main Content */}
     <Coupon/>
  </div>
  )
}

export default MyCoupon