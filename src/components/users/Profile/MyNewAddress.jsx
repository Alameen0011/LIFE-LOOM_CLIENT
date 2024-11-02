import React from 'react'
import AddAddress from './AddAddress'
import SideBar from './SideBar'

const MyNewAddress = () => {
  return (
    <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
    {/* Sidebar */}
    <SideBar />

    {/* Main Content */}
     <AddAddress/>
  </div>
    



  )
}

export default MyNewAddress