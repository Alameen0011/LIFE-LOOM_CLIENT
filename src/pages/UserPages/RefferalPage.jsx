import React from 'react'
import Refferal from '@/components/users/Profile/Refferal'
import SideBar from '@/components/users/Profile/SideBar'


const RefferalPage = () => {
  return (
    <div className="flex min-h-screen mx-auto max-w-5xl my-10 bg-background">
    {/* Sidebar */}
    <SideBar />

    {/* Main Content */}
     <Refferal/>
  </div>
  )
}

export default RefferalPage