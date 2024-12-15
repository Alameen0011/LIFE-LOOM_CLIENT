import SideBar from '../Profile/SideBar'
import OrderHistory from './OrderHistory'

const MyOrder = () => {
  return (
    <div className="flex  min-h-screen mx-auto max-w-5xl my-10 bg-background">
    {/* Sidebar */}
    <SideBar />

    {/* Main Content */}
    <OrderHistory/>
    
  </div>
  )
}

export default MyOrder