import SideBar from './SideBar'
import Address from './Address'

const MyAddress = () => {
  return (
    <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
    {/* Sidebar */}
    <SideBar />

    {/* Main Content */}
     <Address/>
  </div>
  )
}

export default MyAddress