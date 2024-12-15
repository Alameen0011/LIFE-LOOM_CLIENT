import SideBar from './SideBar'
import AddProfile from './AddProfile'

const MyProfile = () => {
    console.log("inside myProfile")
    
  return (
<div className="flex flex-col md:flex-row min-h-screen mx-auto max-w-5xl my-10 bg-background">
{/* Sidebar */}

    <SideBar />

    {/* Main Content */}
     <AddProfile/>
  </div>
  )
}

export default MyProfile