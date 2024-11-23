import SideBar from '@/components/users/Profile/SideBar'
import Wishlist from '@/components/users/Profile/Wishlist'


const MyWishListPage = () => {
  return (
    <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
    {/* Sidebar */}
    <SideBar />

    {/* Main Content */}
     <Wishlist/>
  </div>
   
  )
}

export default MyWishListPage